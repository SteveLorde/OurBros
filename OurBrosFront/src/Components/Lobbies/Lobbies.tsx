import "./Lobbies.css"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/LobbiesService.tsx'
import {Lobby} from "../../Data/Models/Lobby.ts"
import {User} from "../../Data/Models/User.ts"
import {Link} from "react-router-dom";

export function Lobbies() {
    
    //variables
    //---------
    const [lobbies, setLobbies] = useState([])
    
    //methods
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
    
    function JoinLobby(id: number) {
        //let lobbyid = id
        
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
                                <Link to={`/Lobby/${item.id}`}>Join Lobby</Link>
                            </div>
                        </div>
                    )})
                
            </div>
            
        </>
    );
    
    

    
}