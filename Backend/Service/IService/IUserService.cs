using FinalProject.Models;

namespace FinalProject.Service.IService
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAll();

        Task<User> AddUserAsync(User user);
        Task<User> GetUserById(int UserId);


        Task<string> Login(string email, string password);
        Task<User> UpdateUserDetail(int id, User user);
    }
}
