import {AuthenticationDTO} from "../../Components/Authentication/AuthenticationDTO.ts";
import axios from "axios";
import {User} from "../../Data/Models/User.ts";


export let currentuser : User
export let sessiontoken : string = " "
export let isloggedin : boolean = false;

export async function LoginUser(logindata: AuthenticationDTO) {
    return await axios.post<boolean, boolean>("http://localhost:5143/Authentication/Login", logindata)
}

export async function RegisterUser(registerdata: AuthenticationDTO) {
    return await axios.post<boolean, boolean>("http://localhost:5143/Authentication/Register", registerdata)
}

export function SetLoggedInUser(loggedinuser : AuthenticationDTO) {
    currentuser = loggedinuser
}

export function DelogUser() {
    currentuser = null
}
