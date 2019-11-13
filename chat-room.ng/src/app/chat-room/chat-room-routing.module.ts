import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'chat-room',
    component: ChatRoomComponent,
    canActivate: [AuthGuard],
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
