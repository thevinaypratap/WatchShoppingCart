using FinalProject.Models;

namespace FinalProject.Interfaces
{
    public interface ICart
    {
        Task<Cart> AddToCart(int productId, int userId);
        List<Cart> GetAllCartItems(int userId);

        int GetToTalPrice(int userId);
        //Task<Cart> RemoveItem(int productId, int userId);
        bool RemoveItem(int productId, int userId);
        bool RemoveItem2(int productId);

        void ReduceItem(int userId, int productId);
        void IncreaseItem(int userId, int productId);
        string UpdateItem(int userId, int productId, int quantity);

        void EmptyCart(int userId);


        int GetCount(int userId);

    }
}
