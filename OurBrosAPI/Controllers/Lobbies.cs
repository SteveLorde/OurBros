using Microsoft.AspNetCore.Mvc;
using OurBrosAPI.Services.Database;

namespace OurBrosAPI.Controllers;

[ApiController]
public class Lobbies : Controller
{
    //inject IDatabase service
    private IDatabase _db;

    public Lobbies(IDatabase db)
    {
        _db = db;
    }
    // GET
    [HttpGet(Name = "GetLobbies")]
    public IActionResult GetLobbies()
    {
        
        return Ok();
    }
    
    [HttpGet(Name = "ShitLobby")]
    public IActionResult LOLLobbies()
    {
        
        return Ok();
    }
    
    
}