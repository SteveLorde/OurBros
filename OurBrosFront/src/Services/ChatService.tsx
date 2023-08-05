import * as signalR from "@microsoft/signalr";
import {LogLevel} from "@microsoft/signalr";
import {Message} from "../Data/Models/Message.ts";


export const connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5143/Chat" , {withCredentials: false}).configureLogging(LogLevel.Information).build()

//Start SignalR
export async function StartChat() {
    try {
        await connection.start()
        console.log("SignalR connected Client side")
    } catch (err) {
        console.log('SignalR Failed')
    }
    
    OnConnection()
}

//SignalR "on" receivers
//----------------------
function OnConnection() {
    connection.on("connect" , message => {
        console.log(message)
    })
}

export async function OnReceiveMessage() {
    await connection.on("ReceiveMessage" , (message) => {
        let chatmessage = {} as Message
        chatmessage.message = message
        return chatmessage
    })
}

export function OnReceiveAll() {
    let response : any
     connection.on("ReceiveToAll" , message => {
         response = message
     })
    console.log("response is " + response)
    return response
}

//SignalR invokers
//----------------
export async function TestInvoke() {
    try {
        connection.invoke("TestSend")
        await connection.on("TestReceive", res => console.log(res))
    } catch (err) {
        console.log(err)
    }
}

export async function JoinLobby (lobbyid : number) {
    try {
        connection.invoke("JoinLobby", lobbyid)
    }
    catch (err) {
        console.log(err)
    }
}

export async function LeaveLobby (lobbyid : number) {
    try {
        connection.invoke("LeaveLobby", lobbyid)
    }
    catch (err) {
        console.log(err)
    }
}


export async function SendMessageInLobby(lobbyid : number, message : string) {
    try {
        await connection.invoke("SendMessageInGroup", lobbyid, message)
        console.log('message sent successfully')
    } catch (err) {
        console.log(err)
    }
}


export async function SendMessageToAll(message : string) {
    try {
        connection.invoke("SendToAll", message)
        console.log('test message to all sent successfully')
    } catch (err) {
        console.log(err)
    }
}