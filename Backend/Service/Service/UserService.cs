using FinalProject.Interfaces;
using FinalProject.Models;
using FinalProject.Service.IService;

namespace FinalProject.Service.Service
{
    public class UserService : IUserService
    {
        private readonly IUser _userRepository;

        public UserService(IUser userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            try
            {
                return await _userRepository.GetAll();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in a suitable way
                Console.WriteLine($"Error in GetAll(): {ex.Message}");
                throw;
            }
        }

        public async Task<User> AddUserAsync(User user)
        {
            try
            {
                return await _userRepository.AddUserAsync(user);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in a suitable way
                Console.WriteLine($"Error in AddUserAsync(): {ex.Message}");
                throw;
            }
        }

        public async Task<User> GetUserById(int userId)
        {
            try
            {
                return _userRepository.GetUserById(userId);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in a suitable way
                Console.WriteLine($"Error in GetUserById(): {ex.Message}");
                throw;
            }
        }

        public async Task<string> Login(string email, string password)
        {
            try
            {
                return _userRepository.Login(email, password);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in a suitable way
                Console.WriteLine($"Error in Login(): {ex.Message}");
                throw;
            }
        }

        public async Task<User> UpdateUserDetail(int id, User user)
        {
            try
            {
                return await _userRepository.UpdateUserDetail(id, user);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it in a suitable way
                Console.WriteLine($"Error in UpdateUserDetail(): {ex.Message}");
                throw;
            }
        }
    }
}
