import * as signalR from "@microsoft/signalr";


export async function StartChat() {
    let connection  = new signalR.HubConnectionBuilder().withUrl("http://localhost:5143/Chat").build();
    try {
        await connection.start()
        console.log("SignalR connected.")
    } catch (err) {
        console.error(err)
    }

    await StartChat();

    return () => {
        connection.off("ReceiveMessage")
        connection.stop()
    }
}

export async function SignalTest() {
    let connection  = new signalR.HubConnectionBuilder().withUrl("http://localhost:5143/Chat").build();
    
    
}