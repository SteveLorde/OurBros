import {AuthenticationDTO} from "../../Components/Authentication/AuthenticationDTO.ts"
import axios from "axios"
import {User} from "../../Data/Models/User.ts"


export let currentuser : User
export let sessiontoken : string = " "
export let isloggedin : boolean = false;

export async function Login(logindata: AuthenticationDTO) {
        let check = await axios.post<boolean, boolean>("http://localhost:5143/Authentication/Login", logindata)
        SetLoggedIn(logindata)
        return check
}

export async function Register(registerdata: AuthenticationDTO) {
    return await axios.post<boolean, boolean>("http://localhost:5143/Authentication/Register", registerdata)
}

export function SetLoggedIn(loggedinuser : AuthenticationDTO) {
    currentuser = loggedinuser
    isloggedin = true
}

export function Logout() {
    currentuser = null
    sessiontoken = ''
    isloggedin = false
}
