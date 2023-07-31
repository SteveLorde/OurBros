import {useParams} from "react-router-dom"
//import {Button, Form} from "react-bootstrap"
//import {useState} from "react";

export function LobbyChat() {
    
    //variables
    //---------
    const { id } = useParams()
    const [users, setUsers] = useState()
    //const [room, setRoom] = useState()
    
    //functions
    //---------
    
    
    // @ts-ignore
    return (
        <>
            <div className="window">
                
                <div className="chatwindow">
                    <h1>LobbyChat Works</h1>
                    <h1>You are in Lobby {id}</h1>
                        <div>
                            <input type="text" className="chatbar"/>
                        </div>
                 </div>
                
                <div className="userslist">
                    
                </div>
                
            </div>
        </>
    );
}