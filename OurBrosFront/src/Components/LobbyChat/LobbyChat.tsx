import "./LobbyChat.css"
import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/Lobbies/LobbiesService.tsx'
import * as chatservice from '../../Services/Chat/ChatService.tsx'
import {Message} from "../../Data/Models/Message.ts";
import {currentuser} from "../../Services/Authentication/Authentication.tsx";


//import {Button, Form} from "react-bootstrap"
//import {useState} from "react";

export function LobbyChat() {
    
    //variables
    //---------
    const {id} = useParams()
    const lobbyid = parseInt(id as string)
    const [users, setUsers] = useState<string[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [lobbyname, setLobbyName] = useState<any>()
    const [lobbyowner, setLobbyOwner] = useState<string>()
    
    let message : string = ''
    
    //functions
    //---------
    useEffect(() => {
        async function fetchLobbyName() {
            let Lobby = await lobbiesservice.GetLobbyFromServer(lobbyid)
            setLobbyName(Lobby?.lobbyname)
            setLobbyOwner(Lobby?.lobbyowner)
        }
        fetchLobbyName()
    }, [])
 
    useEffect( () => {
        chatservice.connection.on("ReceiveToAll" , ( response : Message ) => {
            setMessages([...messages, response])
        })
    })

    useEffect( () => {
        chatservice.connection.on("UserJoined" , ( user : string ) => {
            setUsers([...users, user])
        })
    })
    
    function SubmitMessage(event : any) {
        event.preventDefault()
        let messagetosend = {} as Message
        messagetosend.username = currentuser.username
        messagetosend.message = message
        chatservice.SendMessageInLobby(lobbyid,messagetosend.message)
        message = ''
    }
    
    
    //view
    //----
    return (
        <>
            <Link className={"Back"} to={"/Lobbies"} onClick={ () => chatservice.LeaveLobby}>Back</Link>
            
            <div className="window">
                <div className="chatwindow">
                    <h1>You are in Lobby {lobbyname}</h1>
                    <div className="messagesandchat">
                        <ul className={'messages'}>
                            {messages?.map( (message : Message) => 
                                <p className={"message"}>{message.username}: {message.message}</p>
                            )}
                        </ul>
                        
                        <div>
                          <form onSubmit={SubmitMessage} >
                              <input type={'text'} onChange={ (x) => message = x.target.value } />
                              <input type={'submit'} value={'Send Message'} />
                          </form>
                        </div>
                        
                    </div>
                 </div>
                
                <div className="userslist">
                    <h1>USERSLIST</h1>
                    <div className={'users'}>
                        <p>{lobbyowner}</p>
                        {users?.map( (user : string, index : number) => (
                            <p key={index}>{user}</p>
                        ))}
                    </div>
                </div>
                
            </div>
        </>
    )
}