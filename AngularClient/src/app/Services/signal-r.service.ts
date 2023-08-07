import {Injectable} from '@angular/core'
import * as signalr from '@microsoft/signalr'
import {LogLevel} from '@microsoft/signalr'

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
      this.connection.on('ReceivedMEssage', (response) => {
          console.log(response)
        }
      )
    }
      catch (err)
      {
        console.log(err)
      }
  }

  async SendMessage(message : string) {
    try {
      this.connection.invoke("SendMessage", message)
    }
    catch (err) {
      console.log(err)
    }
  }

}
