using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Data.DTOs;
using OurBrosAPI.Data.Models;
using OurBrosAPI.Services.Authentication.Model;

namespace OurBrosAPI.Services.Authentication;

class Auth : IAuth
{
    private DataContext _db;
    public Auth(DataContext db)
    {
        _db = db;
    }

    public async Task<bool> Login(UserDTO loginrequest)
    {
        try
        {
            bool checklogin = false;
            //1st, check username in database
            bool checkuser = _db.Users.Any(x => x.username == loginrequest.username);
            if (checkuser)
            {
                //2nd verify password
                bool checkpassword = await VerifyPassword(loginrequest);
                if (checkpassword)
                {
                    checklogin = true;
                }

                return true;
            }
            else
            {
                checklogin = false;
            }
            
            return checklogin;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<bool> Register(UserDTO registerrequest)
    {
        try
        {
            //1-hash password
            Hash hashedpassword = await HashPassword(registerrequest);
            //2-create new user
            User newuser = new User
            {
                username = registerrequest.username,
                salt = hashedpassword.salt,
                hashedpassword = hashedpassword.hash
            };
            //3-add to database
            await _db.Users.AddAsync(newuser);
            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private async Task<Hash> HashPassword(UserDTO user)
    {
        string salt = GenerateSalt();
        string hashedpassword = GenerateHashedPassword(user.userpassword, salt);
        Hash userhash = new Hash()
        {
            hash = hashedpassword,
            salt = salt
        };
        return userhash;
    }
    
    private string GenerateHashedPassword(string password, string salt)
    {
        byte[] passwordbytes = Encoding.UTF8.GetBytes(password);
        byte[] saltbytes = Convert.FromBase64String(salt);

        byte[] combinedbytes = new byte[saltbytes.Length + passwordbytes.Length];
        Buffer.BlockCopy(saltbytes,0,combinedbytes, 0, saltbytes.Length);
        Buffer.BlockCopy(passwordbytes,0,combinedbytes, saltbytes.Length, passwordbytes.Length);

        SHA256 sha256 = SHA256.Create();
        byte[] hashedbytes = sha256.ComputeHash(combinedbytes);
        string hashedpassword = Convert.ToBase64String(hashedbytes);
        return hashedpassword;
    }

    private async Task<bool> VerifyPassword(UserDTO loginrequest)
    {
        User usertoverfiy = await _db.Users.FirstAsync(x => x.username == loginrequest.username);
        string passwordtoverify = GenerateHashedPassword(loginrequest.userpassword, usertoverfiy.salt);

        if (passwordtoverify == usertoverfiy.hashedpassword)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    private static string GenerateSalt()
    {
        byte[] salt = new byte[16];
        var rng = new RNGCryptoServiceProvider();
        rng.GetBytes(salt);
        string base64salt = Convert.ToBase64String(salt);
        return base64salt;
    }

}