using System;
using System.Diagnostics;
using System.Text;

namespace DockerStarterTest
{
    class Program
    {
        private static int lineCount = 0;
        private static StringBuilder output = new StringBuilder();

        static void Main(string[] args)
        {
            var processInfo = new ProcessStartInfo("docker", "run --rm -it -v D:\\BME\\VsProjects\\repos\\MicromouseSimulatorPOC\\MicromouseSimulatorPOC\\Resources\\Usercodes\\5fc9365ab95a9bcade6099ae:/usr/src/app my-python-app");

            processInfo.CreateNoWindow = true;
            processInfo.UseShellExecute = false;
            processInfo.RedirectStandardOutput = true;
            processInfo.RedirectStandardError = true;

            int exitCode;
            using (var process = new Process())
            {
                process.StartInfo = processInfo;
                process.OutputDataReceived += new DataReceivedEventHandler((sender, e) =>
                {
                    // Prepend line numbers to each line of the output.
                    if (!String.IsNullOrEmpty(e.Data))
                    {
                        lineCount++;
                        output.Append("\n[" + lineCount + "]: " + e.Data);
                    }
                });

                process.Start();
                process.BeginOutputReadLine();
                process.WaitForExit(1200000);
                if (!process.HasExited)
                {
                    process.Kill();
                }

                exitCode = process.ExitCode;
                process.Close();
            }

            Console.WriteLine(output.ToString());
        }
    }
}
