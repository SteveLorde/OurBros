import {Injectable} from '@angular/core'
import * as signalr from '@microsoft/signalr'
import {LogLevel} from '@microsoft/signalr'
import {Message} from "../Data/Models/Message";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  connection = new signalr.HubConnectionBuilder().withUrl("http://localhost:5143/Chat" , {withCredentials: false}).configureLogging(LogLevel.Information).build()

  constructor() {

  }

  //functions
  //---------

  async StartConnection() {
    try {
      this.connection.start()
    } catch (err) {
      console.log(err)
    }
  }

  async Listen(){
    try {
      this.connection.on('ReceivedMessage', (response) => {
          console.log(response)
        }
      )
    }
      catch (err)
      {
        console.log(err)
      }
  }

  async SendMessage(message : Message) {
    try {
      this.connection.invoke("SendToAll", message.username, message.message)
    }
    catch (err) {
      console.log(err)
    }
  }

}
