import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './components/chat/chat.component';
import { NgbButtonsModule, NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';

@NgModule({
  declarations: [ChatRoomComponent, ChatComponent, AvatarComponent, ChatListComponent],
  imports: [
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgbButtonsModule,
    NgbModalModule,
    NgbTypeaheadModule,
    CommonModule,
    ChatRoomRoutingModule
  ]
})
export class ChatRoomModule {}
