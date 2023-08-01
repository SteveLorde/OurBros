﻿import "./LobbyChat.css"
import {Link, useParams} from "react-router-dom"
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useEffect, useState} from "react";
import {User} from "../../Data/Models/User.ts";
//import {Button, Form} from "react-bootstrap"
//import {useState} from "react";

export function LobbyChat() {
    
    //variables
    //---------
    const { id } = useParams()
    const [users, setUsers] = useState()
    const [messages, setMessages] = useState()
    const connection : HubConnection = new HubConnectionBuilder().withUrl("http://localhost:5143/Chat").build();
    
    //functions
    //---------
    useEffect(() => {
        async function startSignalR() {
            try {
                await connection.start()
                console.log("SignalR connected.")
            } catch (err) {
                console.error(err)
            }
        }

        startSignalR();

        connection.on("ReceiveMessage", (user, message) => {
            setMessages((messages : string) => [messages, `${user}: ${message}`])
        })

        return () => {
            connection.off("ReceiveMessage")
            connection.stop()
        }
    }, [])
    
    //view
    //----
    return (
        <>
            <Link className={"Back"} to={"/Lobbies"}>Back</Link>
            
            <div className="window">
                <div className="chatwindow">
                    <h1>LobbyChat Works</h1>
                    <h1>You are in Lobby {id}</h1>
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