import "./Lobbies.css"
import * as chatservice from "../../Services/ChatService.tsx";

export function Lobbies() {
    
    //variables
    
    //methods
    
    function CreateLobby() {
        var lobbiesgrid = document.getElementById("lobbies")
        chatservice.Function2();
    }
    
    return (
        <div>
            <div className="Header">
                <h1>Lobbies Test</h1>
                <button className="CreateLobby">Create Lobby</button>
            </div>

            <div id="lobbies" className="lobbies">
                <div className="LobbyCard">
                    <h3 className="LobbyTitle">LobbyName</h3>
                    <div className="LobbyAction">
                        <p className="LobbyUsersNumber">NOfUsers</p>
                        <button className="JoinLobby">Join</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
    
    

    
}