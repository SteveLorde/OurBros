import * as signalR from "@microsoft/signalr";
import {Message} from "../Data/Models/Message.ts";


//Start SignalR
export async function StartChat() {
    const connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5143/Chat" , {
        withCredentials: false
    }).build()
    try {
        await connection.start()
        console.log("SignalR connected")
    } catch (err) {
        console.log('SignalR Failed')
    }
    
    connection.on("ReceiveMessage" , (message) => {
        let chatmessage = {} as Message
        chatmessage.message = message
        return chatmessage
    })
    
}
