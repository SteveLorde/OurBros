import "./LobbyChat.css"
import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/LobbiesService.tsx'
import {User} from "../../Data/Models/User.ts";

//import {Button, Form} from "react-bootstrap"
//import {useState} from "react";

export function LobbyChat() {
    
    //variables
    //---------
    const {id} = useParams()
    const lobbyid = parseInt(id as string)
    const [users, setUsers] = useState<any>()
    const [messages, setMessages] = useState<any>()
    const [lobbyname, setLobby] = useState<any>()
    
    //functions
    //---------
    useEffect(() => {
        async function fetchLobbyName() {
            let _lobbyname = await lobbiesservice.GetLobbyFromServer(lobbyid)
            setLobby(_lobbyname)
        }
        fetchLobbyName()
    }, [])
    
    //view
    //----
    return (
        <>
            <Link className={"Back"} to={"/Lobbies"}>Back</Link>
            
            <div className="window">
                <div className="chatwindow">
                    <h1>You are in Lobby {lobbyname}</h1>
                    <div className="messagesandchat">
                        <ul className={'messages'}>
                            {messages?.map( (message : string, index : number) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                        <div>
                            <input type="text" className="chatbar"/>
                            <input type="submit" className={'submitchat'}/>
                        </div>
                    </div>
                 </div>
                
                <div className="userslist">
                    <h1>USERSLIST</h1>
                    <div className={'users'}>
                        {users?.map( (user : User, index : number) => (
                            <p key={index}>{user.username}</p>
                        ))}
                    </div>
                </div>
                
            </div>
        </>
    )
}