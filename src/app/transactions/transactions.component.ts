import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../services/api.service';
import { MessagesService } from '../services/messages.service';

import { Transaction } from '../../app/models/transaction';

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

    public dataSource = new MatTableDataSource<Transaction>();
    balance = 0;

    onDataSourceChange(data: MatTableDataSource<Transaction>) {
        this.dataSource = data;
    }

    onBalanceChange(balance: number) {
        this.balance = balance;
    }

    onSubmitForm(formData: {
        accountId: string;
        amount: number;
        transactionType: string;
        userId: string;
    }) {
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
