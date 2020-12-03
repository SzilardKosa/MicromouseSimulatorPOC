using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MicromouseSimulatorPOC.Models
{
    [BsonCollection("Mazes")]
    public class Maze : BaseDocument
    {
        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Walls { get; set; }
    }
}
