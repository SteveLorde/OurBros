namespace OurBrosAPI.Data.Models;

public class User
{
    public User(int id, string username, string password)
    {
        this.Id = id;
        this.username = username;
        this.userpassword = password;
    }
    
    public User(User user)
    {
        this.Id = user.Id;
        this.username = user.username;
        this.userpassword = user.userpassword;
    }

    public int Id { get; set; }
    public string username { get; set; }
    public string userpassword { get; set; }
    
}