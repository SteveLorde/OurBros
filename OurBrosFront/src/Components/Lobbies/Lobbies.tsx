import "./Lobbies.css"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/Lobbies/LobbiesService.tsx'
import * as chatservice from '../../Services/Chat/ChatService.tsx'
import {Lobby} from "../../Data/Models/Lobby.ts"
import {User} from "../../Data/Models/User.ts"
import * as reactrouter from "react-router-dom";
import {PasswordModal} from "../PasswordModal/PasswordModal.tsx";
import {useNavigate} from "react-router-dom";
import {CreateLobbyModal} from "../CreateLobbyModal/CreateLobbyModal.tsx";

export function Lobbies() {
    
    //variables
    //---------
    const [lobbies, setLobbies] = useState([])
    const [ispassmodalvisible, SetPasswordModal] = useState(false)
    const [iscreatemodalvisible, SetCreateLobbyModal] = useState(false)
    const [selectedlobbyId, setSelectedLobbyId] = useState<number>(0);

    //functions
    //-------
    const reactnavigate = useNavigate()
    function openpasswordmodal(selectedlobbyid : number) {
        setSelectedLobbyId(selectedlobbyid)
        SetPasswordModal(true)
    }

    function closepasswordmodal() {
        SetPasswordModal(false)
    }

    function opencreatemodal() {
        SetCreateLobbyModal(true)
    }

    function closecreatemodal() {
        SetCreateLobbyModal(false)
    }
    
    async function CheckJoin(lobbyid : number) {
        let check = await chatservice.JoinLobbyOwnerCheck(lobbyid)
        if (check) {
            setSelectedLobbyId(0)
            reactnavigate(`/Lobby/${lobbyid}`)
        }
        else {
            openpasswordmodal(selectedlobbyId)
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
            
            <CreateLobbyModal IsOpen={iscreatemodalvisible} closewindow={closecreatemodal}></CreateLobbyModal>
            <PasswordModal lobbyid={selectedlobbyId} IsOpen={ispassmodalvisible} closewindow={closepasswordmodal}></PasswordModal>
            
            <div id="lobbies" className="lobbies">
                
                {lobbies?.map( (item : Lobby) : any => 
                    <div className="LobbyCard">
                            <h3 className="LobbyTitle">{item.lobbyname}</h3>
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