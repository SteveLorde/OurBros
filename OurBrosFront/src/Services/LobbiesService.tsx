import axios, {AxiosResponse} from "axios";
import {Lobby} from "../Data/Models/Lobby.ts";

export async function GetLobbyFromServer(id: number) {
    try {
        let response : AxiosResponse<Lobby> = await axios.get(`http://localhost:5143/Lobbies/GetLobby/${id}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function GetLobbies() {
    try {
        let response = await axios.get('http://localhost:5143/Lobbies/GetLobbies');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export function CreateLobby() {
    
}
