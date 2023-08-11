import "./Navbar.css"
import reactLogo from '../../assets/react.svg'
import {Link} from "react-router-dom";
import * as authservice from "../../Services/Authentication/Authentication.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";

export function Navbar() {
    
    //functions
    //---------
    const {loginWithRedirect , logout, user , isAuthenticated, getAccessTokenSilently} : any = useAuth0()
    
    useEffect( () => {
        async function gettoken() {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently()
                console.log("token saved successfully")
                authservice.storesession(token, user.name)
            }
        }
        gettoken()
    }, [isAuthenticated])

    return (
        <div className="nav">
            <div className="navbody">
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Lobbies">Lobbies</Link></li>
                    <li><Link to="/Settings">Settings</Link></li>
                    <p onClick={loginWithRedirect}>LoginAuth</p>
                    <p onClick={logout}>Logout</p>
                </ul>
            </div>
            <img  className="reactlogo" src={reactLogo}/>
        </div>
    );
}