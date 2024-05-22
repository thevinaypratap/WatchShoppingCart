using FinalProject.Models;
using FinalProject.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Repository
{
    public class OrderRepository : IOrder
    {

        private readonly FinalDbContext context;
        private readonly ICart cart;
        private readonly IProduct product;

        public OrderRepository(FinalDbContext context, ICart _cart, IProduct product)
        {
            this.context = context;
            cart = _cart;
            this.product = product;
        }

        public int GetTotalAmount(int userId)
        {
            return cart.GetToTalPrice(userId);
        }

        public bool MatchProductId(int userId)
        {
            int cartProductId = context.Carts.FirstOrDefault(c => c.UserId == userId).ProductId;
            var productProductId = context.Products.FirstOrDefault(c => c.ProductId == cartProductId).ProductId;

            if (productProductId != null)
            {
                return true;
            }
            return false;
        }
        public bool Minus(int productId, int userId)
        {
            var result = context.Products.FirstOrDefault(c => c.ProductId == productId);
            var qty = context.Carts.FirstOrDefault(c => c.ProductId == productId && c.UserId == userId).Quantity;
            result.Stock = result.Stock - Convert.ToInt32(qty);

            context.SaveChanges();

            return true;
        }
        public int GetAmountById(int userId, int productId)
        {
            int sum = 0;
            var result = context.Carts.FirstOrDefault(c => c.ProductId == productId && c.UserId == userId).UnitPrice;
            var result1 = context.Carts.FirstOrDefault(c => c.ProductId == productId && c.UserId == userId).Quantity;
            return result * result1;
        }

        public bool CheckQuantity(int userId, int productId)
        {
            var result = context.Products.FirstOrDefault(c => c.ProductId == productId).Stock;
            var qty = context.Carts.FirstOrDefault(c => c.ProductId == productId && c.UserId == userId).Quantity;
            int remain = result - Convert.ToInt32(qty);
            if (remain > 0)
            {
                return true;
            }
            return false;
        }
        public string BuyNowByOrderId(int userId, int productId)
        {

            bool check = CheckQuantity(userId, productId);

            if (check == false)
            {
                return "Out of stock";
            }

            else
            {
                var Id = context.Carts.FirstOrDefault(c => c.ProductId == productId).ProductId;
                bool m = MatchProductId(userId);

                if (m == true && Id == productId)
                {

                    var order = new Order
                    {
                        UserId = userId,

                        TotalAmount = GetAmountById(userId, productId),


                    };

                    context.Orders.Add(order);

                    context.SaveChanges();

                    Minus(productId, userId);

                    cart.EmptyCart(userId);

                    return "your order is done.\nYour Order id is : " + context.Orders.FirstOrDefault(c => c.UserId == userId).OrderId.ToString();
                }
                else
                {
                    return "Product Id not found";
                }

            }
        }
        public string BuyNow(int userId)
        {
            var carts = context.Carts.FirstOrDefault(c => c.UserId == userId);
            if (carts == null)
            {
                return "Cart is empty.";
            }
            else
            {
                var Id = context.Carts.Where(p => p.UserId == userId).Select(p => p.ProductId).ToList();
                bool[] arr = new bool[Id.Count];
                int count = 0;
                foreach (var id in Id)
                {
                    if (context.Carts.FirstOrDefault(p => p.ProductId == id && p.UserId == userId).Quantity <= context.Products.FirstOrDefault(p => p.ProductId == id).Stock)
                    {
                        arr[count] = true;
                        count++;
                    }
                    else
                    {
                        arr[count] = false;
                    }
                }
                if (arr.Contains(false))
                {
                    return "out of stock.";
                }
                else
                {
                    int total = 0;
                    int p = 0;
                    string productName = "";
                    foreach (var id in Id)
                    {

                        int amount = context.Products.FirstOrDefault(p => p.ProductId == id).Price;
                        int quantity = context.Carts.FirstOrDefault(u => u.ProductId == id).Quantity;
                        string pName = context.Carts.FirstOrDefault(u => u.ProductId == id).ProductName;
                        p = id;
                        int price = amount * quantity;
                        productName = productName + pName + "  ";
                        total += price;
                        Minus(p, userId);
                    }

                    var order = new Order
                    {
                        UserId = userId,
                        ProductId = carts.ProductId,

                        ProductName = productName,
                        Quantity = carts.Quantity,

                        TotalAmount = total,


                    };

                    context.Orders.Add(order);

                    context.SaveChanges();

                    cart.EmptyCart(userId);

                    return context.Orders.FirstOrDefault(c => c.UserId == userId).OrderId.ToString();
                }

            }
        }


        public IEnumerable<Order> GetAllOrders()
        {
            return context.Orders.ToList();
        }

        public IEnumerable<Order> GetMyOrders(int userId)
        {
            return context.Orders.Where(t => t.UserId == userId).ToList();
        }

    }
}
