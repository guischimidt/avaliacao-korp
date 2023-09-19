import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.sass'],
})
export class MessagesComponent implements OnInit {
    message: string | undefined;
    type: string | undefined;

    constructor(private messagesService: MessagesService) {}

    ngOnInit() {
        this.messagesService.getMessage().subscribe((message) => {
            this.message = message.message;
            this.type = message.type;

            setTimeout(() => {
                this.message = undefined;
                this.type = undefined;
            }, 6000);
        });
    }
}
