import {useState} from "react";
import {CheckPassword} from "../../Services/LobbiesService.tsx";
import {useNavigate} from "react-router-dom";

export function PasswordModal({lobbyid,closewindow} : any) {

    const reactnavigate = useNavigate()
    const [inputValue, setInputValue] = useState('');

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
            <div>
                <h2>Enter password</h2>
                <input type="text" value={inputValue} placeholder="Insert Password of Lobby" onChange={ () => handleInputChange}/>
                <button onClick={closewindow}>Join</button>
            </div>
        </>
    );
}