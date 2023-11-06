export function PasswordModal({IsOpen,closewindow} : any) {
    
    if (!IsOpen) {
        return  null
    }
    
    
    
    return (
        <>
            <div>
                <h2>Enter password</h2>
                <input type="text" value="Insert Password of the lobby"/>
                <button onClick={closewindow}>Join</button>
            </div>
        </>
    );
}