import "./Navbar.css"
import reactLogo from '../../assets/react.svg'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as authservice from '../../Services/Authentication/Authentication.tsx'



export function Navbar() {
    
    const reactnavigate = useNavigate()
    const [authstatus, setAuthStatus] = useState<string>("Login/Register")


    //functions
    //---------
    function CheckLoginStatus() {
        if (authservice.isloggedin == false) {
            setAuthStatus("Login/Register")
        }
        else {
            setAuthStatus("Logout")
        }
    }
    
    function CheckAuthAction() {
        if (authservice.isloggedin == true) {
            authservice.Logout()
            reactnavigate('/')
        }
        else {
            reactnavigate('/auth')
        }
    }

    useEffect( () => {
        CheckLoginStatus()
    }, [])
    
    return (
        <div className="nav">
            <div className="navbody">
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Lobbies">Lobbies</Link></li>
                    <li><Link to="/Settings">Settings</Link></li>
                    <li className="AuthLink" onClick={ () => CheckAuthAction}>{authstatus}</li>
                </ul>
            </div>
            <img  className="reactlogo" src={reactLogo}/>
        </div>
    );
}