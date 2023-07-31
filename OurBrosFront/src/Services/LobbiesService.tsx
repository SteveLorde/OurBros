import axios from "axios";

export async function GetLobbies(){
    const res = await  axios.get('http://localhost:5143/Lobbies/GetLobbies')
    return res
}

export function CreateLobby() {
    
}
