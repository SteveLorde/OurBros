import {useParams} from "react-router-dom";

export function LobbyChat() {
    const { id } = useParams()
    return (
        <>
        <h1>LobbyChat Works</h1>
        <h1>You are in Lobby {id}</h1>
        </>
    );
}