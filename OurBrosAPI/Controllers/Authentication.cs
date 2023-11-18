using Microsoft.AspNetCore.Mvc;
using OurBrosAPI.Data.DTOs;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Authentication;
using OurBrosAPI.Services.Chat;

namespace OurBrosAPI.Controllers;

[Route("Authentication")]
[ApiController]
public class Authentication : Controller
{
    //--------------------------
    private readonly IAuth _auth;

    public Authentication(IAuth auth)
    {
        _auth = auth;
    } 
    //--------------------------
    
    [HttpPost("Login")]
    public async Task<bool> Login(UserDTO loginrequest)
    {
        return await _auth.Login(loginrequest);
    }
    
    [HttpPost("Register")]
    public async Task<bool> Register(UserDTO registerrequest)
    {
        return await _auth.Register(registerrequest);
    }

}