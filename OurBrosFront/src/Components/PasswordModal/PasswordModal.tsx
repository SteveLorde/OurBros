import {useState} from "react";
import {CheckPassword} from "../../Services/Lobbies/LobbiesService.tsx";
import {useNavigate} from "react-router-dom";
import './passwordmodal.css'

export function PasswordModal({lobbyid,IsVisible,closewindow}) {
    const reactnavigate = useNavigate()
    const [inputValue, setInputValue] = useState('');
    if (!IsVisible) return null;
    
    function handleInputChange(inputtext : string) {
        setInputValue(inputtext)
    }
    
    function SubmitPassword() {
        let check : any = CheckPassword(inputValue)
        if (check) {
            reactnavigate(`/Lobby/${lobbyid}`)
        }
        else {
            
        }
        
    }
    
    return (
        <>
            <div className={'modaloverlay'}>
                <div className={'modal'}>
                    <h2>Enter password</h2>
                    <input type="text" value={inputValue} placeholder="Insert Password of Lobby" onChange={ () => handleInputChange}/>
                    <button onClick={ () => closewindow }>Join</button>
                </div>
            </div>
        </>
    );
}