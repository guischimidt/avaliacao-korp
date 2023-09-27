import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { MessagesService } from '../../services/messages.service';
import { ResetFormService } from '../../services/reset-form.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-transactions-form',
    templateUrl: './transactions-form.component.html',
    styleUrls: ['./transactions-form.component.sass'],
})
export class TransactionsFormComponent implements OnInit {
    @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() dataSourceChange: EventEmitter<MatTableDataSource<any>> =
        new EventEmitter<MatTableDataSource<any>>();
    @Output() balanceChange: EventEmitter<any> = new EventEmitter<any>();

    public dataSource = new MatTableDataSource<any>();

    transactionForm: FormGroup;
    users: any;
    accounts: any;
    balance: any;

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private resetFormService: ResetFormService,
        private apiService: ApiService
    ) {
        this.transactionForm = this.fb.group({
            userId: [[null], Validators.required],
            accountId: [[null], Validators.required],
            amount: [[null], Validators.required],
            transactionType: [[null], Validators.required],
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
        this.balanceChange.emit(this.balance);
    }

    getTransactions(accountId: any) {
        this.balance = this.accounts.find(
            (account: { _id: any }) => account._id === accountId
        )?.balance;

        this.apiService.getTransactions(accountId).subscribe((res) => {
            this.dataSource.data = res;
            this.dataSourceChange.emit(
                new MatTableDataSource(this.dataSource.data)
            );
        });

        this.balanceChange.emit(this.balance);
    }

    onSubmit() {
        if (this.transactionForm.valid) {
            this.submitForm.emit(this.transactionForm.value);
            this.getAccounts(this.transactionForm.value.userId);
            this.getTransactions(this.transactionForm.value.accountId);
        } else {
            this.messagesService.sendMessage(
                'Formulário inválido. Não pode ser enviado.',
                'error'
            );
        }
    }

    onReset() {
        this.resetFormService.resetForm(this.transactionForm);
        this.balance = null;
        this.balanceChange.emit(this.balance);
    }
}
