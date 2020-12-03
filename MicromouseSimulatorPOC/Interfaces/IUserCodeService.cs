using MicromouseSimulatorPOC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.Interfaces
{
    public interface IUserCodeService : IBaseService<UserCode>
    {
        RunResult RunUserCode(string id);
    }
}
