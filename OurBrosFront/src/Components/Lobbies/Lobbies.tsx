import "./Lobbies.css"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/LobbiesService.tsx'
import * as chatservice from '../../Services/ChatService.tsx'
import {Lobby} from "../../Data/Models/Lobby.ts"
import {User} from "../../Data/Models/User.ts"
import {Link} from "react-router-dom";

export function Lobbies() {
    
    //variables
    //---------
    const [lobbies, setLobbies] = useState([])
    
    //functions
    //-------
    useEffect( () => {
        async function fetchData() {
            let result = await lobbiesservice.GetLobbies()
            setLobbies(result)
        }
        fetchData()
    }, [])

    function CreateLobby() {
        let lobbiesgrid = document.getElementById("lobbies")
        return lobbiesgrid
    }
    
    //View
    //----
    return (
        <>
            <div className="Header">
                <h1>Lobbies Test</h1>
                <button className="CreateLobby" onClick={CreateLobby}>Create Lobby</button>
            </div>
            
            <div id="lobbies" className="lobbies">
                
                {lobbies?.map( (item : Lobby) : any => 
                    <div className="LobbyCard">
                            <h3 className="LobbyTitle">{item.lobbyName}</h3>
                            <div className="LobbyAction">
                                {item.users?.map( (subitem : User) : any => {
                                        <p className="LobbyUsersNumber">{subitem.username}</p>
                                    })}
                                <Link to={`/Lobby/${item.id}`} onClick={ () => chatservice.JoinLobby}>Join Lobby</Link>
                            </div>
                        </div>
                    )}
                
            </div>
            
        </>
    );
    
    

    
}