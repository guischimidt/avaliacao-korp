import { Injectable } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MessagesService {
    private messagesSubject = new Subject<{ message: string; type: string }>();
    private messageTimeout = 6000;

    sendMessage(message: string, type: string) {
        this.messagesSubject.next({ message, type });

        timer(this.messageTimeout)
            .pipe(take(1))
            .subscribe(() => {
                this.clearMessage();
            });
    }
    getMessage(): Observable<{ message: string; type: string }> {
        return this.messagesSubject.asObservable();
    }

    clearMessage() {
        this.messagesSubject.next({ message: '', type: '' });
    }
}
