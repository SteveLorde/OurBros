import * as signalR from "@microsoft/signalr";
import {LogLevel} from "@microsoft/signalr";
import {GetLobbyFromServer} from "./LobbiesService.tsx";
import {username} from "./Authentication/Authentication.tsx";


export const connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5143/Chat" , {withCredentials: false}).configureLogging(LogLevel.Information).build()

//Start SignalR
export async function StartChat() {
    try {
        await connection.start()
        console.log("SignalR connected Client side")
    } catch (err) {
        console.log('SignalR Failed')
    }
}

//SignalR "on" receivers
//----------------------

connection.on("connect" , message => {
        console.log(message)
})

//SignalR invokers
//----------------
export async function JoinLobbyOwnerCheck (lobbyid : number) {
    try {
        let lobbydata = await GetLobbyFromServer(lobbyid)
        return username == lobbydata?.lobbyOwner;
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
        await connection.invoke("SendMessageInLobby", lobbyid, message)
        console.log('message sent successfully')
    } catch (err) {
        console.log(err)
    }
}

}