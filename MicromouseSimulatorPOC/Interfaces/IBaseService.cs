using MicromouseSimulatorPOC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.Interfaces
{
    public interface IBaseService<TDocument> where TDocument : IBaseDocument
    {
        IEnumerable<TDocument> FindAll();
        TDocument FindById(string id);
        TDocument Create(TDocument document);
        void Update(string id, TDocument document);
        void Delete(string id);
    }
}
