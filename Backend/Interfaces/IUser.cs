using FinalProject.Models;

namespace FinalProject.Interfaces
{
    public interface IUser
    {

        Task<IEnumerable<User>> GetAll();

        Task<User> AddUserAsync(User user);
        User GetUserById(int UserId);


        string Login(string email, string password);
        Task<User> UpdateUserDetail(int id, User user);
    }
}
