using FinalProject.Models;
using FinalProject.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Repository
{
    public class CartRepository : ICart
    {

        private readonly FinalDbContext context;

        public CartRepository(FinalDbContext context)
        {
            this.context = context;
        }



        public List<Cart> GetAllCartItems(int userId)
        {
            return context.Carts.Where(t => t.UserId == userId).ToList();
        }
        public async Task<Cart> AddToCart(int productId, int userId)
        {

            var productExist = await context.Carts.FirstOrDefaultAsync(t => t.ProductId == productId && t.UserId == userId);
            var product = context.Products.Find(productId);
            if (product == null)
            {
                return null;
            }

            var stock = context.Products.FirstOrDefault(c => c.ProductId == productId).Stock;
            if (stock != 0)
            {
                if (productExist == null)
                {
                    productExist = new Cart
                    {
                        ProductId = productId,
                        UserId = userId,
                        Quantity = 1,
                        ProductName = context.Products.SingleOrDefault(t => t.ProductId == productId).ProductName,
                        UnitPrice = context.Products.SingleOrDefault(t => t.ProductId == productId).Price

                    };
                    await context.Carts.AddAsync(productExist);

                }
                else if (stock <= productExist.Quantity)
                {
                    return productExist;
                }
                else
                {
                    productExist.Quantity++;

                }
                await context.SaveChangesAsync();
                return productExist;
            }
            else
            {
                return null;
            }
        }

        /* public async Task<Cart> RemoveItem(int productId, int userId)
         {
             var result = context.Carts.FirstOrDefault(t => t.ProductId == productId && t.UserId == userId);
             if (result != null)
             {
                 context.Carts.Remove(result);
                 await context.SaveChangesAsync();
                 return result;
             }
             return null;


         }*/
        public bool RemoveItem(int productId, int userId)
        {
            var result = context.Carts.FirstOrDefault(t => t.ProductId == productId && t.UserId == userId);
            if (result != null)
            {
                context.Carts.Remove(result);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool RemoveItem2(int productId)
        {
            var result = context.Carts.FirstOrDefault(t => t.ProductId == productId);
            if (result != null)
            {
                context.Carts.Remove(result);
                context.SaveChanges();
                return true;
            }
            return false;
        }


        


        public int GetToTalPrice(int userId)
        {
            int sum = 0;
            var items = GetAllCartItems(userId);
            foreach (var item in items)
            {
                sum += item.UnitPrice * item.Quantity;
            }
            return sum;
        }

        public string UpdateItem(int userId, int productId, int quantity)
        {
            var stock = context.Products.FirstOrDefault(p => p.ProductId == productId).Stock;
            if (stock >= quantity + 1)
            {
                var myItem = context.Carts.FirstOrDefault(t => t.UserId == userId && t.ProductId == productId);
                if (myItem != null)
                {
                    myItem.Quantity = quantity;
                    context.SaveChanges();

                }
                return "Cart is updated.";
            }
            else
            {
                return "product out of stock.";
            }
        }

        public void ReduceItem(int userId, int productId)
        {
            var qty = context.Carts.FirstOrDefault(c => c.ProductId == productId).Quantity;
            if (qty > 1)
            {
                context.Carts.FirstOrDefault(c => c.ProductId == productId).Quantity = qty - 1;
                context.SaveChanges();
            }

        }

        public void IncreaseItem(int userId, int productId)
        {
            var qty = context.Carts.FirstOrDefault(c => c.ProductId == productId).Quantity;
            var stock = context.Products.FirstOrDefault(p => p.ProductId == productId).Stock;
            if (qty < stock)
            {
                context.Carts.FirstOrDefault(c => c.ProductId == productId).Quantity = qty + 1;
                context.SaveChanges();
            }

        }
        public void EmptyCart(int userId)
        {
            var cartItems = context.Carts.Where(c => c.UserId == userId);
            foreach (var cartItem in cartItems)
            {
                context.Carts.Remove(cartItem);
            }

            context.SaveChanges();
        }

        public int GetCount(int userId)
        {
            var items = context.Carts.Where(c => c.UserId == userId);
            int count = 0;
            foreach (var item in items)
            {
                count = count + item.Quantity;
            }

            return count;
        }

    }

    public class ShoppingCartUpdate
    {
        public int ProductId { get; set; }
        public int PurchaseQuantity { get; set; }
        public bool RemoveItem { get; set; }
    }




}

