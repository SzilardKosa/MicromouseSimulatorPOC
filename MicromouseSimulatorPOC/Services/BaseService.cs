using MicromouseSimulatorPOC.Interfaces;
using MicromouseSimulatorPOC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.Services
{
    public class BaseService<TDocument> : IBaseService<TDocument> where TDocument : IBaseDocument
    {
        private readonly IMongoRepository<TDocument> _repository;

        public BaseService(IMongoRepository<TDocument> repository)
        {
            this._repository = repository;
        }
        public IEnumerable<TDocument> FindAll()
        {
            return _repository.FilterBy(TDocument => true).ToList();
        }

        public TDocument FindById(string id)
        {
            return _repository.FindById(id);
        }

        public virtual TDocument Create(TDocument document)
        {
            _repository.InsertOne(document);
            return document;
        }
        public virtual void Update(string id, TDocument document)
        {
            if(_repository.FindById(id) == null)
            {
                throw new DocumentDoesntExistsException();
            }
            _repository.ReplaceOne(id, document);
        }

        public virtual void Delete(string id)
        {
            _repository.DeleteById(id);
        }

    }
}
