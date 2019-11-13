import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  private hubConnection: HubConnection;

  private messagesSource = new Subject<Message>();
  messages$ = this.messagesSource.asObservable();

  constructor() {}

  start() {
    if (environment.hub) {
      this.hubConnection = new HubConnectionBuilder().withUrl(`${environment.api_path}/chat-room`).build();

      this.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

      this.hubConnection.on(Methods.SendAll, (type: number, parentId: number) => {
        this.messagesSource.next({
          type,
          parentId
        });
      });
    }
  }

  sendMessage(type, parentId) {
    this.hubConnection.send(Methods.SendAll, type, parentId).catch(err => console.error(err));
  }
}

export class Message {
  type: MessageTypes;
  parentId: number;
}

export enum Methods {
  SendAll = 'sendToAll'
}

export enum MessageTypes {
  Conversation = 1,
  Message = 2
}
