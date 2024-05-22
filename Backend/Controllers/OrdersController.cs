using FinalProject.Models;
using FinalProject.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FinalProject.Service.IService;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    //[EnableCors("policy")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService ordercontext;
        public OrdersController(IOrderService ordercontext)
        {
            this.ordercontext = ordercontext;

        }
        [HttpPost]
        [Route("AddOrder")]
       // [Authorize(Roles = "CustomerUser")]

        public IActionResult BuyNow()
        {

            var result = ordercontext.BuyNow(GetIdFromToken());
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();

        }

        [HttpPost]
        [Route("AddOrderById")]
       // [Authorize(Roles = "CustomerUser")]
        public IActionResult BuyNowOrderById(int productId)
        {

            var result = ordercontext.BuyNowByOrderId(GetIdFromToken(), productId);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();

        }
        private int GetIdFromToken()
        {
            var userIdClaim = HttpContext.User.FindFirst("userId");
            if (userIdClaim == null)
            {
                throw new Exception("User ID claim not found in token.");
            }
            return int.Parse(userIdClaim.Value);
        }



        [HttpGet("AllOrders")]
        //[Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<Order>> GetAllOrders()
        {
            /* var userId = int.Parse(HttpContext.User.FindFirst(c => c.Type == "UserId").Value);*/
            var orders = ordercontext.GetAllOrders();
            if (orders == null)
            {
                return NotFound("No orders found.");
            }
            return Ok(orders);
        }
        [HttpGet("MyOrders")]
       // [Authorize(Roles = "CustomerUser")]
        public ActionResult<IEnumerable<Order>> GetMyOrders()
        {
            var result = ordercontext.GetMyOrders(GetIdFromToken());
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }
        private int getid()
        {
            var id = HttpContext.User.FindFirst("UserId").Value;
            return int.Parse(id);
        }

    }



}
