using OurBrosAPI.Data.DTOs;
using OurBrosAPI.Services.Authentication.Model;

namespace OurBrosAPI.Services.Authentication;

public interface IAuth
{
    public Task<bool> Login(UserDTO loginrequest);
    public Task<bool> Register(UserDTO registerrequest);
    public Task<Hash> HashPassword(UserDTO user);
    public Task<bool> VerifyPassword(UserDTO usertoverify);
}