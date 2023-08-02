import "./LobbyChat.css"
import {Link, useParams} from "react-router-dom"
import {useState} from "react";
import * as lobbiesservice from '../../Services/LobbiesService.tsx'

//import {Button, Form} from "react-bootstrap"
//import {useState} from "react";

export function LobbyChat() {
    
    //variables
    //---------
    const {id } = useParams()
    const [users, setUsers] = useState()
    const [messages, setMessages] = useState<any>()
    
    //functions
    //---------
    function ClearCurrentLobby() {
        lobbiesservice.SetLobby('')
    }
    

    //view
    //----
    return (
        <>
            <Link className={"Back"} to={"/Lobbies"} onClick={ () => ClearCurrentLobby}>Back</Link>
            
            <div className="window">
                <div className="chatwindow">
                    <h1>You are in Lobby {lobbiesservice.GetLobby()}</h1>
                    <div className="messagesandchat">
                        <div>
                            {messages?.map( (message : string, index : number) => (
                                <div key={index}>{message}</div>
                            ))}
                        </div>
                        <div>
                            <input type="text" className="chatbar"/>
                        </div>
                    </div>
                 </div>
                
                <div className="userslist">
                    <h1>USERSLIST</h1>

                </div>
            </div>
        </>
    )
}