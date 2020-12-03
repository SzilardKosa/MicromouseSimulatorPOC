using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MicromouseSimulatorPOC.Models
{
    [BsonCollection("UserCodes")]
    public class UserCode : BaseDocument
    {
        public string Name { get; set; }
        public string Language { get; set; }
        public string CodeText { get; set; }
        public string filePath { get; set; }
    }
}
