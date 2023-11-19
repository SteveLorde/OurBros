import "./Lobbies.css"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/Lobbies/LobbiesService.tsx'
import * as chatservice from '../../Services/Chat/ChatService.tsx'
import * as authservice from '../../Services/Authentication/Authentication.tsx'
import {Lobby} from "../../Data/Models/Lobby.ts"
import {User} from "../../Data/Models/User.ts"
import * as reactrouter from "react-router-dom";
import {PasswordModal} from "../PasswordModal/PasswordModal.tsx";
import {useNavigate} from "react-router-dom";
import {CreateLobbyModal} from "../CreateLobbyModal/CreateLobbyModal.tsx";
import lockedicon from "../../assets/lockicon.png"
import unlockedicon from "../../assets/lockopenicon.png"
export function Lobbies() {
    
    //variables
    //---------
    const [lobbies, setLobbies] = useState([])
    const [ispassmodalvisible, SetPasswordModal] = useState<boolean>(false)
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
        openpasswordmodal(lobbyid)
        /*
        let check = await chatservice.JoinLobbyOwnerCheck(lobbyid)
        if (check) {
            setSelectedLobbyId(0)
            reactnavigate(`/Lobby/${lobbyid}`)
        }
        else {
            openpasswordmodal(selectedlobbyId)
        }
        
         */
    }
    
    function CreateLobby() {
        try {
            if (authservice.isloggedin == true) {
                opencreatemodal()
            }
            else {
                
            }
        }
        catch (err) {
            console.log(err)
        }
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
                <button className="CreateLobbyButton" onClick={ () => CreateLobby}>Create Lobby</button>
            </div>
            
            <CreateLobbyModal IsOpen={iscreatemodalvisible} closewindow={closecreatemodal}></CreateLobbyModal>
            <PasswordModal lobbyid={selectedlobbyId} IsVisible={ispassmodalvisible} closewindow={closepasswordmodal}></PasswordModal>
            
            <div id="lobbies" className="lobbies">
                
                {lobbies?.map( (item : Lobby) : any => 
                    <div onClick={ () => openpasswordmodal(item.id) } className="LobbyCard">
                            <h2 className="LobbyTitle">{item.lobbyname}</h2>
                            <div className="LobbyAction">
                                <h3 className="LobbyUserCount">Users: {item.usercount ?? 0}</h3>
                                {item.islocked == true ? (<img className={'lockicon'} src={lockedicon} /> ) : ( <img className={'lockicon'} src={unlockedicon}/>)}
                            </div>
                        </div>
                    )}
                
            </div>
            
        </>
    );
    
    

    
}