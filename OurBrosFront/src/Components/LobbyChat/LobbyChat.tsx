import {useParams} from "react-router-dom"
import {Button, Form} from "react-bootstrap"
import {useState} from "react";

export function LobbyChat() {
    
    const { id } = useParams()
    const [user, setUser] = useState()
    const [room, setRoom] = useState()
    
    
    // @ts-ignore
    return (
        <>
        <h1>LobbyChat Works</h1>
        <h1>You are in Lobby {id}</h1>
            <Form className="lobby">
                <Form.Group>
                    <Form.Control placeholder="name" onChange={e => setUser(e.target.value)} />
                    <Form.Control placeholder="room" onChange={e => setRoom(e.target.value)} />
                </Form.Group>
                <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
            </Form>
        </>
    );
}