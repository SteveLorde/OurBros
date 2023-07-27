
function StartChat() {
    // @ts-ignore
    const connection = new signalR.HubConnectionBuilder().withUrl("/chat").build()
    
    
}