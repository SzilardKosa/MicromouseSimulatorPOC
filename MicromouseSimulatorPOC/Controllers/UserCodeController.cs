using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using MicromouseSimulatorPOC.DTOs;
using MicromouseSimulatorPOC.Interfaces;
using MicromouseSimulatorPOC.Models;
using MicromouseSimulatorPOC.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MicromouseSimulatorPOC.Controllers
{
    [Route("user-code")]
    [ApiController]
    public class UserCodeController : ControllerBase
    {
        private readonly IUserCodeService _service;
        public UserCodeController(IUserCodeService service)
        {
            this._service = service;
        }

        // Fetch all user code
        [HttpGet]
        public ActionResult<IEnumerable<UserCodeDTO>> GetUserCodes()
        {
            return Ok(_service.FindAll().Select(uc => new UserCodeDTO(uc)));
        }

        // Find one user code by id
        [HttpGet("{id}")]
        public ActionResult<UserCodeDTO> GetUserCode(string id)
        {
            var result = _service.FindById(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(new UserCodeDTO(result));
        }

        // Create a new user code
        [HttpPost]
        public ActionResult<UserCodeDTO> CreateNewUserCode(UserCodeDTO userCodeDTO)
        {
            // Handle error if no data is sent.
            if (userCodeDTO == null)
            {
                return BadRequest("User code data must be set!");
            }

            try
            {
                // Map the DTO to entity and save the entity
                UserCode createdEntity = _service.Create(userCodeDTO.ToEntity());

                // According to the conventions, we have to return a HTTP 201 created repsonse, with
                // field "Location" in the header pointing to the created object
                return CreatedAtAction(
                    nameof(GetUserCode),
                    new { id = createdEntity.Id },
                    new UserCodeDTO(createdEntity));
            }
            catch (ProgramLanguageNotSupportedException)
            {
                // Handle error if programming language is not supported
                return BadRequest("This programming language is not supported!");
            }
        }

        // Update an existing user code
        [HttpPut("{id}")]
        public ActionResult UpdateUserCode(string id, UserCodeDTO userCodeDTO)
        {
            // Handle error if no data is sent.
            if (userCodeDTO == null)
            {
                return BadRequest("User code data must be set!");
            }

            try
            {
                // Map the DTO to entity and save it
                _service.Update(id, userCodeDTO.ToEntity());

                // According to the conventions, we have to return HTTP 204 No Content.
                return NoContent();
            }
            catch (DocumentDoesntExistsException)
            {
                // Handle error if the user code to update doesn't exists.
                return BadRequest("No user code exists with the given ID!");
            }
            catch (ProgramLanguageNotSupportedException)
            {
                // Handle error if programming language is not supported
                return BadRequest("This programming language is not supported!");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUserCode(string id)
        {
            _service.Delete(id);
            // According to the conventions, we have to return HTTP 204 No Content.
            return NoContent();
        }

        // Run code by id and send back stdout
        [HttpGet("{id}/result")]
        public ActionResult<RunResult> RunUserCode(string id)
        {
            try
            {
                var result = _service.RunUserCode(id);

                return Ok(result);
            }
            catch (DocumentDoesntExistsException)
            {
                // Handle error if the user code to update doesn't exists.
                return BadRequest("No user code exists with the given ID!");
            }
        }
    }
}
