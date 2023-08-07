import "./LobbyChat.css"
import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react";
import * as lobbiesservice from '../../Services/LobbiesService.tsx'
import * as chatservice from '../../Services/ChatService.tsx'
import {User} from "../../Data/Models/User.ts";
import {Message} from "../../Data/Models/Message.ts";


//import {Button, Form} from "react-bootstrap"
//import {useState} from "react";

export function LobbyChat() {
    
    //variables
    //---------
    const {id} = useParams()
    const lobbyid = parseInt(id as string)
    const [users, setUsers] = useState<any>()
    const [messages, setMessages] = useState<Message[]>([])
    const [lobbyname, setLobby] = useState<any>()
    const [testmessage, setTestMessage] = useState<any>()
    
    let message : string = ''
    
    //functions
    //---------
    useEffect(() => {
        async function fetchLobbyName() {
            let _lobbyname = await lobbiesservice.GetLobbyFromServer(lobbyid)
            setLobby(_lobbyname)
        }
        fetchLobbyName()
    }, [])
 
    useEffect( () => {
        chatservice.connection.on("ReceiveToAll" , ( response : Message ) => {
            setMessages([...messages, response])
        })
    })
    
    function SubmitMessageToALL(event : any) {
        //prevent component from re-rendering when calling function
        event.preventDefault()
        let messagetosend = {} as Message
        messagetosend.username = 'test username'
        messagetosend.message = message
        chatservice.SendMessageToAll(messagetosend.username,messagetosend.message)
        message = ''
    }
    
    function TestInvoke(event : any) {
        event.preventDefault()
        chatservice.TestInvoke()
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
                            <p>test message is {testmessage}</p>
                            
                            {messages?.map( (message : Message) => 
                                <p className={"message"}>{message.username}: {message.message}</p>
                            )}
                            
                        </ul>
                        
                        <div>
                          <form onSubmit={SubmitMessageToALL} >
                              <input type={'text'} onChange={ (x) => message = x.target.value } />
                              <input type={'submit'} value={'Send Message'} />
                          </form>
                            <button onClick={TestInvoke}>Test SignalR Invoke</button>
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