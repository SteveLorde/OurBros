import "./Navbar.css"
import reactLogo from '../../assets/react.svg'
import {Link} from "react-router-dom";

export function Navbar() {
    return (
        <div className="nav">
            <div className="navbody">
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Lobbies">Lobbies</Link></li>
                    <li><Link to="/Settings">Settings</Link></li>
                </ul>
                <img className="reactlogo" src={reactLogo}/>
            </div>
        </div>
    );
}