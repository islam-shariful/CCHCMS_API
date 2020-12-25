using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CCHCMS_API.Models;
using CCHCMS_API.Repositories;

namespace CCHCMS_API.Controllers
{
    [RoutePrefix("api/doctors")]
    public class DoctorController : ApiController
    {
        DoctorRepository doctorRepository = new DoctorRepository();
        [Route("", Name = "GetDoctors")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(doctorRepository.GetAll());
        }
        [Route("{id}", Name = "GetDoctor")]
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            return Ok(doctorRepository.Get(id));
        }
        [Route("", Name = "PostDoctor")]
        [HttpPost]
        public IHttpActionResult Post(Doctor doctor)
        {
            doctorRepository.Insert(doctor);
            string uri = Url.Link("GetDoctor", new { id = doctor.Id });
            return Created(uri, doctor);
        }
        [Route("{id}", Name = "UpdateDoctor")]
        [HttpPut]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Doctor doctor)
        {
            doctor.Id = id;
            doctorRepository.Update(doctor);
            return Ok(doctor);
        }
        [Route("{id}", Name = "DeleteDoctor")]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            doctorRepository.Delete(id);
            return StatusCode(HttpStatusCode.NotFound);
        }
    }
}
