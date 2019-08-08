﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SportPredictor.Handlers;
using SportPredictor.Models;

namespace Predictor.Controllers.Api
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {

        public TeamController()
        {
            // empty for now
        }

        // GET api/team/{id}
        [HttpGet("{id}")]
        public object Get(string id)
        {
            return JsonConvert.SerializeObject(new Team(int.Parse(id)));
        }
    }
}