using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cat_V_Dog_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoundController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetAudioFile(string fileLocation)
        {
            var bytes = new byte[0];


            var fs = new FileStream(fileLocation, FileMode.Open, FileAccess.Read);
            
            BinaryReader br = new BinaryReader(fs);
            long numBytes = new FileInfo(fileLocation).Length;
            byte[] buff = br.ReadBytes((int)numBytes);

            return File(buff, "audio/mpeg", "sound.mp3");


        }

    }
}
