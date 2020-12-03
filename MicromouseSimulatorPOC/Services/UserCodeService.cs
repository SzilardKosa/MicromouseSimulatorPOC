using MicromouseSimulatorPOC.Data;
using MicromouseSimulatorPOC.Interfaces;
using MicromouseSimulatorPOC.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.Services
{
    public class UserCodeService : BaseService<UserCode>, IUserCodeService
    {
        private readonly IMongoRepository<UserCode> _userCodeRepsitory;
        private Dictionary<string, string> languageToFileName = new Dictionary<string, string>()
        {
            {"C", "main.c" },
            {"C++", "main.cpp" },
            {"Python", "main.py" }
        };
        private Dictionary<string, string> languageToImageName = new Dictionary<string, string>()
        {
            {"C", "my-c-app" },
            {"C++", "my-cpp-app" },
            {"Python", "my-python-app" }
        };

        public UserCodeService(IMongoRepository<UserCode> userCodeRepsitory) : base(userCodeRepsitory)
        {
            this._userCodeRepsitory = userCodeRepsitory;
        }

        public override UserCode Create(UserCode document)
        {
            //Convert code type to filename
            if (!languageToFileName.ContainsKey(document.Language))
            {
                throw new ProgramLanguageNotSupportedException();
            }
            var fileName = languageToFileName[document.Language];

            // Create folder with unique id
            var id = ObjectId.GenerateNewId().ToString();
            var currentPath = Directory.GetCurrentDirectory();
            var folderPath = Path.Combine(currentPath, "Resources", "Usercodes", id);
            Directory.CreateDirectory(folderPath);

            // Save program code to file
            var filePath = Path.Combine(folderPath, fileName);
            File.WriteAllText(filePath, document.CodeText);

            // Save document to DB
            document.Id = id;
            document.filePath = filePath;
            _userCodeRepsitory.InsertOne(document);
            return document;
        }
        public override void Update(string id, UserCode newDocument)
        {
            var oldDocument = _userCodeRepsitory.FindById(id);
            if (oldDocument == null)
            {
                throw new DocumentDoesntExistsException();
            }
            // is the new format valid
            if (!languageToFileName.ContainsKey(newDocument.Language))
            {
                throw new ProgramLanguageNotSupportedException();
            }
            var fileName = languageToFileName[newDocument.Language];
            var oldFileName = Path.GetFileName(oldDocument.filePath);
            var folderPath = Path.GetDirectoryName(oldDocument.filePath);
            // is it the same filename if not then delete old one
            if (fileName != oldFileName)
            {
                File.Delete(oldDocument.filePath);
            }
            // write file
            var filePath = Path.Combine(folderPath, fileName);
            File.WriteAllText(filePath, newDocument.CodeText);
            // updat values on document
            newDocument.Id = id;
            newDocument.filePath = filePath;
            _userCodeRepsitory.ReplaceOne(id, newDocument);
        }

        public override void Delete(string id)
        {
            var document = _userCodeRepsitory.FindById(id);
            if (document == null)
            {
                return;
            }
            var folderPath = Path.GetDirectoryName(document.filePath);
            Directory.Delete(folderPath, true);
            _userCodeRepsitory.DeleteById(id);
        }

        public RunResult RunUserCode(string id)
        {
            var document = _userCodeRepsitory.FindById(id);
            if (document == null)
            {
                throw new DocumentDoesntExistsException();
            }
            var runResult = new RunResult();

            runResult.Result = RunDockerContainer(document);

            return runResult;
        }

        private string RunDockerContainer(UserCode document)
        {
            // got it from stackoverflow 
            // https://stackoverflow.com/questions/45308991/how-to-call-docker-run-from-c-sharp-application
            StringBuilder output = new StringBuilder();

            var info = new ProcessStartInfo("docker");
            var folderPath = Path.GetDirectoryName(document.filePath);
            var imageName = languageToImageName[document.Language];
            info.Arguments = $"run --rm -it -v {folderPath}:/usr/src/app {imageName}";
            info.CreateNoWindow = true;
            info.UseShellExecute = false;
            info.RedirectStandardOutput = true;
            info.RedirectStandardError = true;

            using (var process = new Process())
            {
                process.StartInfo = info;
                process.OutputDataReceived += new DataReceivedEventHandler((sender, e) =>
                {
                    if (!String.IsNullOrEmpty(e.Data))
                    {
                        output.Append(e.Data);
                    }
                });

                process.Start();
                process.BeginOutputReadLine();
                process.WaitForExit(20000);
                if (!process.HasExited)
                {
                    process.Kill();
                }
                process.Close();
            }

            return output.ToString();
        }

    }
}
