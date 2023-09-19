import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ResetFormService } from '../services/reset-form.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.sass'],
})
export class TransactionsComponent implements OnInit {
    displayedColumns: string[] = ['date', 'type', 'amount'];
    public dataSource = new MatTableDataSource<any>();

    transactionForm: FormGroup;
    users: any;
    accounts: any;
    balance: any;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private resetFormService: ResetFormService
    ) {
        this.transactionForm = this.fb.group({
            userId: [null],
            accountId: [null],
            amount: [null],
            transactionType: [null],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.users = res;
        });

        this.transactionForm.get('userId')?.valueChanges.subscribe((userId) => {
            if (userId) {
                this.getAccounts(userId);
            }
        });

        this.transactionForm
            .get('accountId')
            ?.valueChanges.subscribe((accountId) => {
                if (accountId) {
                    this.getTransactions(accountId);
                }
            });
    }

    getAccounts(userId: any) {
        this.apiService.getAccounts().subscribe((res) => {
            this.accounts = res;
            this.accounts = this.accounts.filter(
                (account: { userId: { _id: any } }) =>
                    account.userId._id === userId
            );
            if (this.transactionForm.value.accountId) {
                this.updateBalance(this.transactionForm.value.accountId);
            }
        });
    }

    updateBalance(accountId: any) {
        this.balance = this.accounts.find(
            (account: { _id: any }) => account._id === accountId
        ).balance;
    }

    getTransactions(accountId: any) {
        this.balance = this.accounts.find(
            (account: { _id: any }) => account._id === accountId
        )?.balance;

        this.apiService.getTransactions(accountId).subscribe((res) => {
            this.dataSource.data = res;
        });
    }

    message = '';
    type = '';

    onSubmit() {
        if (this.transactionForm.valid) {
            this.apiService
                .saveTransaction(this.transactionForm.value)
                .subscribe({
                    next: () => {
                        this.message = 'Transação realizada com sucesso';
                        this.type = 'success';

                        this.getAccounts(this.transactionForm.value.userId);
                        this.getTransactions(
                            this.transactionForm.value.accountId
                        );
                    },
                    error: (error) => {
                        this.message = error.message;
                        this.type = 'error';
                    },
                });
        } else {
            this.message = 'Formulário inválido. Não pode ser enviado.';
            this.type = 'error';
        }
    }

    resetForm() {
        this.resetFormService.resetForm(this.transactionForm);
    }
}
