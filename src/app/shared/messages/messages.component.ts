import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.sass'],
})
export class MessagesComponent {
    @Input() message: string | undefined;
    @Input() type: string | undefined;
}
