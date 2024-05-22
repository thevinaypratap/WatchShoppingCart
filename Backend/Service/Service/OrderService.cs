using FinalProject.Interfaces;
using FinalProject.Models;
using FinalProject.Service.IService;

namespace FinalProject.Service.Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrder ordercontext;

        public OrderService(IOrder ordercontext)
        {
            this.ordercontext = ordercontext;

        }

        public string BuyNow(int userId)
        {
            // Console.WriteLine(getid());
            try
            {
                return ordercontext.BuyNow(userId);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in BuyNow(): {ex.Message}");
                throw;
            }

        }


        public string BuyNowByOrderId(int userId, int productId)
        {

            try
            {
                return ordercontext.BuyNowByOrderId(userId, productId);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in BuyNow(): {ex.Message}");
                throw;
            }



        }

        public IEnumerable<Order> GetAllOrders()
        {
            /* var userId = int.Parse(HttpContext.User.FindFirst(c => c.Type == "UserId").Value);*/
            var orders = ordercontext.GetAllOrders();
            if (orders == null)
            {
                throw new Exception("No order in the Database");
            }
            return ordercontext.GetAllOrders();
        }

        public IEnumerable<Order> GetMyOrders(int userId)
        {

            var orders = ordercontext.GetMyOrders(userId);
            if (orders == null)
            {
                throw new Exception("No order in the  database");
            }
            return ordercontext.GetMyOrders(userId);
        }

      

    }
}
