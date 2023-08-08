import { Component } from '@angular/core';
import {SignalRService}  from '../../../Services/signal-r.service'
import {Message} from "../../../Data/Models/Message";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //variables
   message : string = ''
   messages : Message[] = []

  constructor(private _chatservice : SignalRService) {

     //SignalR Listener
    this._chatservice.connection.on("ReceiveToAll" , (response : Message) => {
      this.messages.push(response)
      console.log('signalr returned a message')
    })

  }

  //functions
  async StarChat(){
     try {
       this._chatservice.connection.start()
       console.log("SignalR started on AngularClient ")
     }
     catch (err) {
       console.log(err)
     }
  }

  SendMessage() {
     let x = {} as Message
    x.username = 'angular user'
    x.message = this.message
    this._chatservice.SendMessage(x)
    this.message = ''
  }

}
