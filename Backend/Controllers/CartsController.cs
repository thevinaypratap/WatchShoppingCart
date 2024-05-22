using FinalProject.Models;
using FinalProject.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using FinalProject.Service.IService;
using Microsoft.AspNetCore.Authorization;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    //[EnableCors("policy")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartsController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // GET: api/Carts
        [HttpGet]
        
        [Route("GetCartItems")]
        [Authorize(Roles ="CustomerUser")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            try
            {
                var result = _cartService.GetAllCartItems(GetIdFromToken());
                if (result == null || !result.Any())
                {
                    return NoContent();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Authorize(Roles ="CustomerUser")]
        [Route("AddItemToCart")]
        public async Task<IActionResult> PostCart(int productId)
        {
            try
            {
                var result = await _cartService.AddToCart(productId, GetIdFromToken());
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }

            catch (Exception)
            {
                return NoContent();
            }
        }

        // DELETE: api/Carts/5
        [HttpDelete]
        [Route("RemoveItem")]
        [Authorize(Roles ="CustomerUser")]
        public async Task<IActionResult> RemoveItem(int productId)
        {
            try
            {
                _cartService.RemoveItem2(productId);
                return Ok("Item removed from Cart");
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("TotalPrice")]
   
        public async Task<ActionResult<int>> GetTotalPrice()
        {
            try
            {
                var result = _cartService.GetToTalPrice(GetIdFromToken());
                return Ok(result);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        [HttpPut]
        [Route("updateItem")]
       
        public IActionResult UpdateItem(int productId, int quantity)
        {
            var result = _cartService.UpdateItem(GetIdFromToken(), productId, quantity);
            return Ok(result);
        }

        [HttpDelete]
        [Route("EmptyCart")]
        [Authorize(Roles = "CustomerUser")]
        public IActionResult EmptyCart()
        {
            _cartService.EmptyCart(GetIdFromToken());
            return Ok("Cart Empty");
        }

        [HttpGet]
        [Route("GetCount")]
        public async Task<ActionResult<int>> TotalCount()
        {
            try
            {
                var result =  _cartService.GetCount(GetIdFromToken());
                return Ok(result);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        [HttpPut]
        [Route("decrement")]
        
        public void ReduceItem(int productId)
        {
            _cartService.ReduceItem(GetIdFromToken(), productId);
        }

        [HttpPut]
        [Route("Increment")]
        public void IncreaseItem(int productId)
        {
            _cartService.IncreaseItem(GetIdFromToken(), productId);
        }

        private int GetIdFromToken()
        {
            var id = HttpContext.User.FindFirstValue("userId");
            return int.Parse(id);
        }
    }
}
