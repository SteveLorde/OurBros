import axios, {AxiosResponse} from "axios";
import {Lobby} from "../../Data/Models/Lobby.ts";
import {username} from "../Authentication/Authentication.tsx";
import {NewLobby} from "../../Data/Models/NewLobby.ts";

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

export async function CheckPassword(inputpassword : string) {
    try {
        return await axios.post<boolean, boolean>("http://localhost:5143/Lobbies/CheckPassword", inputpassword)
    }
    catch (err) {
        console.log(err)
    }
}
export async function CreateLobby(newlobbyrequest : NewLobby) {
    try {
        let newlobby = {lobbyname: newlobbyrequest.lobbyname, lobbypass: newlobbyrequest.lobbypassword, lobbyowner: username }
        return await axios.post("http://localhost:5143/Lobbies/CreateLobby", newlobby)
    }
    catch (err) {
        console.log(err)
    }
}
