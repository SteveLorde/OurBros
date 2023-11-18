import {useForm} from "react-hook-form";
import {NewLobby} from "../../Data/Models/NewLobby.ts";
import {useNavigate} from "react-router-dom";
import {AuthenticationDTO} from "./AuthenticationDTO.ts";
import * as authservice from "../../Services/Authentication/Authentication.tsx"
import {useState} from "react";
import "./AuthStyle.css"

export function AuthenticationLanding() {
    
    const { register: loginuser, handleSubmit : submit1} = useForm<AuthenticationDTO>();
    const { register: registeruser, handleSubmit : submit2} = useForm<AuthenticationDTO>();
    const [isregisterformvisible, SetRegisterVisible] = useState<boolean>(true);
    const [isloginformvisible, SetLoginVisible] = useState<boolean>(false);
    
    const reactnavigate = useNavigate()
    
    function toggleregister() {
        SetLoginVisible(false)
        SetRegisterVisible(true)
    }

    function togglelogin() {
        SetLoginVisible(true)
        SetRegisterVisible(false)
    }
    
    async function Login(formdata : AuthenticationDTO) {
        try {
            let check = await authservice.LoginUser(formdata)
            if (check) {
                reactnavigate('/')
            }
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
            <div className="body">
        {isloginformvisible && <div className="loginform">
            <button onClick={ () => toggleregister() }>Not Registered? click here</button>
            <h2>Login</h2>
            <form className={'form'} onSubmit={submit1(Login)}>
                <h3 className={'inputtitle'}>Username</h3>
                <input type="text" {...loginuser("username")}/>
                <h3 className={'inputtitle'}>Password</h3>
                <input type="text"{...loginuser("password")}/>
                <button type="submit">Login</button>
            </form>
        </div> }

            {isregisterformvisible && <div className="registerform">
                <button onClick={ () => togglelogin() }>Already Registered? Login</button>
                <h2>Register Account</h2>
                <form className={'form'} onSubmit={submit2(Register)}>
                    <h3 className={'inputtitle'}>Username</h3>
                    <input type="text" {...registeruser("username")}/>
                    <h3 className={'inputtitle'}>Password</h3>
                    <input type="text"{...registeruser("password")}/>
                    <button type="submit">Register</button>
                </form>
            </div> }
            </div>
        </>
    );
}