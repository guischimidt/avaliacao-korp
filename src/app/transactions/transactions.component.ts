import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../services/api.service';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.sass'],
})
export class TransactionsComponent {
    constructor(
        private apiService: ApiService,
        private messagesService: MessagesService
    ) {}

    public dataSource = new MatTableDataSource<any>();
    balance: any;

    onDataSourceChange(data: MatTableDataSource<any>) {
        this.dataSource = data;
    }

    onBalanceChange(balance: any) {
        console.log(balance);

        this.balance = balance;
    }

    onSubmitForm(formData: any) {
        if (formData) {
            this.apiService.saveTransaction(formData).subscribe({
                next: () => {
                    this.messagesService.sendMessage(
                        'Transação cadastrada com sucesso',
                        'success'
                    );
                },
                error: (error) => {
                    this.messagesService.sendMessage(error.message, 'error');
                },
            });
        }
    }
}
