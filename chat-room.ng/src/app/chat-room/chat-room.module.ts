import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

@NgModule({
  declarations: [ChatRoomComponent],
  imports: [CommonModule, ChatRoomRoutingModule]
})
export class ChatRoomModule {}
