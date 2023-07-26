using Microsoft.AspNetCore.Mvc;

namespace OurBrosAPI.Controllers;

public class Chat : Controller
{
    // GET
    public IActionResult Index()
    {
        return Ok();
    }
}