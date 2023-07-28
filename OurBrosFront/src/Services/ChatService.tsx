import {Lobby} from "../Data/Models/Lobby.ts";

export function StartChat() {
    function StartChat() {
        // @ts-ignore
        const connection = new signalR.HubConnectionBuilder().withUrl("/chat").build()
    }
     var x = 1
    return x
}

export function GetLobbies() {
    
}

export function CreateLobby(lobby: Lobby) {
    
}

export function DeleteLobby(id: number) {
    return id
}
