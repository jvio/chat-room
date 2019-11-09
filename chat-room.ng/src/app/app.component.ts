import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-room';

  name = '';
  message = '';
  messages: string[] = [];

  hubConnection: HubConnection;

  ngOnInit() {
    this.name = window.prompt('Name:', 'Javier');

    this.hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5200/chat-room').build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this.hubConnection.on('sendToAll', (name: string, message: string) => {
      const text = `${name}: ${message}`;
      this.messages.push(text);
    });
  }

  sendMessage() {
    this.hubConnection.send('sendToAll', this.name, this.message).catch(err => console.error(err));
  }
}
