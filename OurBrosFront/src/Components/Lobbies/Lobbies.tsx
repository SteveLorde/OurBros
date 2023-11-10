import "./Lobbies.css"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/LobbiesService.tsx'
import * as chatservice from '../../Services/ChatService.tsx'
import {Lobby} from "../../Data/Models/Lobby.ts"
import {User} from "../../Data/Models/User.ts"
import * as reactrouter from "react-router-dom";
import {PasswordModal} from "../PasswordModal/PasswordModal.tsx";
import {useNavigate} from "react-router-dom";

export function Lobbies() {
    
    //variables
    //---------
    const [lobbies, setLobbies] = useState([])
    const [isvisible, SetShowWindow] = useState(false)
    const [selectedlobbyId, setSelectedLobbyId] = useState<number>(0);

    //functions
    //-------
    const reactnavigate = useNavigate()
    function openwindow(selectedlobbyid : number) {
        setSelectedLobbyId(selectedlobbyid)
        SetShowWindow(true)
    }

    function closewindow() {
        SetShowWindow(false)
    }
    
    async function CheckJoin(lobbyid : number) {
        let check = await chatservice.JoinLobbyOwnerCheck(lobbyid)
        if (check) {
            setSelectedLobbyId(0)
            reactnavigate(`/Lobby/${lobbyid}`)
        }
        else {
            openwindow(selectedlobbyId)
        }
    }
    
    function CreateLobby() {
        
    }
    
    async function fetchData() {
        let result = await lobbiesservice.GetLobbies()
        setLobbies(result)
    }
    
    useEffect( () => {
        fetchData()
    }, [])

  
    
    //View
    //----
    return (
        <>
            <div className="Header">
                <h1 className={'title'}>Available Lobbies</h1>
                <button className="CreateLobby" onClick={CreateLobby}>Create Lobby</button>
            </div>
            
            <PasswordModal lobbyid={selectedlobbyId} IsOpen={isvisible} closewindow={closewindow}></PasswordModal>
            
            <div id="lobbies" className="lobbies">
                
                {lobbies?.map( (item : Lobby) : any => 
                    <div className="LobbyCard">
                            <h3 className="LobbyTitle">{item.lobbyName}</h3>
                            <h3 className="LobbyUserCount">Users: {item.usercount}</h3>
                            <div className="LobbyAction">
                                <button className="joinbutton" onClick={ () => CheckJoin(item.id) }>Join Lobby</button>
                            </div>
                        </div>
                    )}
                
            </div>
            
        </>
    );
    
    

    
}