﻿using OurBrosAPI.Data.Models;

namespace OurBrosAPI.Data.DTOs;


public interface LobbyDTO
{
    public string lobbyname { get; set; }
    public int usercount { get; set; }
    public List<User> users { get; set; }
    
}