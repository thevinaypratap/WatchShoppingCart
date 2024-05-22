using FinalProject.Interfaces;
using FinalProject.Models;
using FinalProject.Service.IService;

namespace FinalProject.Service.Service
{
    public class CartService : ICartService
    {
        private readonly ICart _cartRepository;
        private readonly IProduct _productRepository;
        private readonly IUser _userRepository;

        public CartService(ICart cartRepository, IProduct productRepository, IUser userRepository)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }

        public async Task<Cart> AddToCart(int productId, int userId)
        {

            var product = await _productRepository.GetProductById(productId);
            if (product == null)
            {
                throw new Exception($"Product with ID {productId} does not exist.");
            }


            var user = _userRepository.GetUserById(userId);
            if (user == null)
            {
                throw new Exception($"User with ID {userId} does not exist.");
            }


            return await _cartRepository.AddToCart(productId, userId);
        }

        public List<Cart> GetAllCartItems(int userId)
        {
            var user = _userRepository.GetUserById(userId);
            if (user == null)
            {
                throw new Exception($"User with ID {userId} does not exist.");
            }


            return _cartRepository.GetAllCartItems(userId);
        }

        public int GetToTalPrice(int userId)
        {

            var user = _userRepository.GetUserById(userId);
            if (user == null)
            {
                throw new Exception($"User with ID {userId} does not exist.");
            }


            return _cartRepository.GetToTalPrice(userId);
        }

        public bool RemoveItem(int productId, int userId)
        {

            var product = _productRepository.GetProductById(productId);
            if (product == null)
            {
                throw new Exception($"Product with ID {productId} does not exist.");
            }


            var user = _userRepository.GetUserById(userId);
            if (user == null)
            {
                throw new Exception($"User with ID {userId} does not exist.");
            }


            return _cartRepository.RemoveItem(productId, userId);
        }

        public bool RemoveItem2(int productId)
        {

            return _cartRepository.RemoveItem2(productId);
        }

        public void ReduceItem(int userId, int productId)
        {

            _cartRepository.ReduceItem(userId, productId);
        }

        public void IncreaseItem(int userId, int productId)
        {

            _cartRepository.IncreaseItem(userId, productId);
        }

        public string UpdateItem(int userId, int productId, int quantity)
        {

            return _cartRepository.UpdateItem(userId, productId, quantity);
        }

        public void EmptyCart(int userId)
        {

            _cartRepository.EmptyCart(userId);
        }

        public async Task<int> GetCount(int userId)
        {

            var user = _userRepository.GetUserById(userId);
            if (user == null)
            {
                throw new Exception($"User with ID {userId} does not exist.");
            }


            return _cartRepository.GetCount(userId);
        }
    }
}
