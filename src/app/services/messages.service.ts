import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessagesService {
    private messagesSubject = new Subject<{ message: string; type: string }>();

    sendMessage(message: string, type: string) {
        this.messagesSubject.next({ message, type });

        setTimeout(() => {
            this.clearMessage();
        }, 6000);
    }
    getMessage(): Observable<{ message: string; type: string }> {
        return this.messagesSubject.asObservable();
    }

    clearMessage() {
        this.messagesSubject.next({ message: '', type: '' });
    }
}
