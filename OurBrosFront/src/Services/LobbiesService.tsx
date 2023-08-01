import axios from "axios";
import {Lobby} from "../Data/Models/Lobby.ts";


export async function GetLobbies() {
    try {
        let response = await axios.get('http://localhost:5143/Lobbies/GetLobbies');
        let results = response.data;
        return results;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function CreateLobby() {
    
}
