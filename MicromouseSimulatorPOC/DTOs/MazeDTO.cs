using MicromouseSimulatorPOC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.DTOs
{
    public class MazeDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string Walls { get; set; }
        public MazeDTO()
        {

        }
        public MazeDTO(Maze maze)
        {
            this.Id = maze.Id;
            this.Name = maze.Name;
            this.Height = maze.Height;
            this.Width = maze.Width;
            this.Walls = maze.Walls;
        }

        public Maze ToEntity()
        {
            return new Maze()
            {
                Id = this.Id,
                Name = this.Name,
                Height = this.Height,
                Width = this.Width,
                Walls = this.Walls
            };
        }
    }
}
