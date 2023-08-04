import axios from "axios";

export async function GetLobbyFromServer(id: number) {
    try {
        let response = await axios.get(`http://localhost:5143/Lobbies/GetLobby/${id}`).then();
        let result = response.data.lobbyName;
        return result
    } catch (error) {
        console.error(error);
        return null;
    }
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
