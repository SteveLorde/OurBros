import axios from "axios";

let currentlobby : string = ''

export function SetLobby(x : string) {
    currentlobby = x
}

export function GetLobby() {
    return currentlobby
}

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
