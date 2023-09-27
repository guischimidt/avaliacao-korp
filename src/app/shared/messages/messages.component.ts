import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessagesService } from '../../services/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.sass'],
})
export class MessagesComponent implements OnInit, OnDestroy {
    message: string | undefined;
    type: string | undefined;

    private messageSubscription: Subscription | undefined;

    constructor(private messagesService: MessagesService) {}

    ngOnInit(): void {
        this.messageSubscription = this.messagesService
            .getMessage()
            .subscribe((message) => {
                this.message = message.message;
                this.type = message.type;
            });
    }

    ngOnDestroy(): void {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
    }
}
