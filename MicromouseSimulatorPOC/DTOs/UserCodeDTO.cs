using MicromouseSimulatorPOC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MicromouseSimulatorPOC.DTOs
{
    public class UserCodeDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Language { get; set; }
        public string CodeText { get; set; }
        public UserCodeDTO()
        {

        }
        public UserCodeDTO(UserCode userCode)
        {
            this.Id = userCode.Id;
            this.Name = userCode.Name;
            this.Language = userCode.Language;
            this.CodeText = userCode.CodeText;
        }
        public UserCode ToEntity()
        {
            return new UserCode()
            {
                Id = this.Id,
                Name = this.Name,
                Language = this.Language,
                CodeText = this.CodeText
            };
        }
    }
}
