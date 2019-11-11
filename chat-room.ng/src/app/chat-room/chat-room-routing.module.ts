import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: 'chat-room',
    component: ChatRoomComponent,
    children: [
      {
        path: ':id',
        component: ChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoomRoutingModule {}
