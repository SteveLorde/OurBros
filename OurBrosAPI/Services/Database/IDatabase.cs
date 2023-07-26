namespace OurBrosAPI.Services.Database;

public interface IDatabase
{
    public void CreateUser();
    public void DeleteUser(int id);
}