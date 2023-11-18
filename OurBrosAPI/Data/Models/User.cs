namespace OurBrosAPI.Data.Models;

public class User
{
    public User(){}
    public User(int id, string name, string password)
    {
        Id = id;
        username = name;
        userpassword = password;
    }

    public int Id { get; set; }
    public string username { get; set; }
    public string userpassword { get; set; }
    public string? salt { get; set; }
    public string? hashedpassword { get; set; }
    
}