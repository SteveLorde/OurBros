import {useForm} from "react-hook-form";
import {NewLobby} from "../../Data/Models/NewLobby.ts";
import {useNavigate} from "react-router-dom";
import {AuthenticationDTO} from "./AuthenticationDTO.ts";
import * as authservice from "../../Services/Authentication/Authentication.tsx"

export function AuthenticationLanding() {
    
    const { register: loginuser, handleSubmit : submit1} = useForm<AuthenticationDTO>();
    const { register: registeruser, handleSubmit : submit2} = useForm<AuthenticationDTO>();
    const reactnavigate = useNavigate()
    
    async function Login(formdata : AuthenticationDTO) {
        try {
            await authservice.LoginUser(formdata)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    async function Register(formdata: AuthenticationDTO) {
        try {
            await authservice.RegisterUser(formdata)
        }
        catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <div>
                <h2>Login</h2>
                <form onSubmit={submit1(Login)}>
                    <h3>Username</h3>
                    <input type="text" {...loginuser("username")}/>
                    <h3>Password</h3>
                    <input type="text"{...loginuser("password")}/>
                    <button type="submit">Login</button>
                </form>
            </div>
            
            <div>
                <h2>Register Account</h2>
                <form onSubmit={submit2(Register)}>
                    <h3>Username</h3>
                    <input type="text" {...registeruser("username")}/>
                    <h3>Password</h3>
                    <input type="text"{...registeruser("password")}/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
}