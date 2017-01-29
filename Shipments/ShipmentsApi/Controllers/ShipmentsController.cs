using ShipmentsApi.Models;
using System.Web.Http;

namespace ShipmentsApi.Controllers
{
    [Authorize]
    public class ShipmentsController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok(Shipment.Create());
        }
    }
}
