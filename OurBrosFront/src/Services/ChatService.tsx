import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

const connection : HubConnection = new HubConnectionBuilder().withUrl("http://localhost:5143/Chat").build();

export async function StartChat() {
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