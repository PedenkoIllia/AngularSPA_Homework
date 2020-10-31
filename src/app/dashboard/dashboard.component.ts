import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { Message } from './message/message';
import { MessageService } from './message/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  messages: Message[];
  changedText: string;
  newMessageText: string;

  ngOnInit(): void {
    this.messageService.get().subscribe(
      data => this.messages = data,
      () => alert("Houston, we have a problem with api url!")
    );
  }

  createNewMessage() {
    if(this.newMessageText.length == 0)
      return;

    this.messageService.post(this.newMessageText).subscribe(
      data => this.messages.push(data),
      () => alert("Houston, we have a problem with post"),
      () => this.newMessageText = ""
    );
  }

  deleteMessage(msgId) {  
    this.messageService.delete(msgId).subscribe(
      () => this.messages = this.messages.filter(m => m.id != msgId),
      () => alert("Houston, we have a problem with delete")
    );
  }

  changeMessage(msgId: number) {
    if(this.messages.filter(m => m.isEditing).length != 0)
      alert("Сonfirm the previous changes before changing the new entry!");
    else {
      let curMessage = this.messages.find(m => m.id == msgId);
      this.changedText = curMessage.msg;
      curMessage.isEditing = true;
    }
  }

  changeConfirm(msgId: number){
    let curMessage = this.messages.find(m => m.id == msgId);
    this.messageService.put( msgId, this.changedText).subscribe(
      data => curMessage.msg = data.msg,
      () => alert("Houston, we have a problem with put."),
      () => {
        curMessage.isEditing = false;
        this.changedText = "";
      }
    );
  }
  
  changeCancel(msgId: number){
    let curMessage = this.messages.find(m => m.id == msgId);
    curMessage.isEditing = false;
    this.changedText = "";
  }
}
