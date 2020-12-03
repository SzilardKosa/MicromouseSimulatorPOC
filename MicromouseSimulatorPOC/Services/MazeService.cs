using MicromouseSimulatorPOC.Data;
using MicromouseSimulatorPOC.Interfaces;
using MicromouseSimulatorPOC.Models;
using Microsoft.EntityFrameworkCore.InMemory.Storage.Internal;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.Services
{
    public class MazeService : BaseService<Maze>, IMazeService
    {
        public MazeService(IMongoRepository<Maze> mazeRepository) : base(mazeRepository)
        {
        }

    }
}
