import "./Lobbies.css"
import {useEffect, useState} from "react";
//import * as lobbiesservice from '../../Services/LobbiesService.tsx'
import {Lobby} from "../../Data/Models/Lobby.ts"
import {User} from "../../Data/Models/User.ts"
import axios from "axios";

export function Lobbies() {
    
    //variables
    //---------
    const [lobbies, setLobbies] = useState<any>([])
    
    //methods
    //-------
    /*
    useEffect( () => {
        const getLobbies = async () => {
            const result : any = await lobbiesservice.GetLobbies()
            setLobbies(result)
        }
        getLobbies()
    }, [])
*/
    useEffect(() => {
        axios.get('https://example.com/api/data')
            .then(response => {
                setLobbies(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    
    function CreateLobby() {
        var lobbiesgrid = document.getElementById("lobbies")
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
                {lobbies.users.map( (item : Lobby) : any => {
                    <div className="LobbyCard">CreateLobby
                            <h3 className="LobbyTitle">{item.name}</h3>
                            <div className="LobbyAction">
                                {item.users.map( (subitem : User) : any => {
                                        <div>{subitem.username}</div>
                                    })}
                                <p className="LobbyUsersNumber">{}</p>
                                <button className="JoinLobby">Join</button>
                            </div>
                        </div>
                    })}
            </div>
            
        </>
    );
    
    

    
}