import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [ChatRoomComponent, ChatComponent, UserDetailComponent, UserListComponent],
  imports: [ReactiveFormsModule, AngularFontAwesomeModule, NgbButtonsModule, CommonModule, ChatRoomRoutingModule]
})
export class ChatRoomModule {}
