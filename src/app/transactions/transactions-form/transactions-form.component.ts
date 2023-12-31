import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { MessagesService } from '../../services/messages.service';
import { ResetFormService } from '../../services/reset-form.service';
import { ApiService } from '../../services/api.service';

import { Person } from '../../models/person';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';

@Component({
    selector: 'app-transactions-form',
    templateUrl: './transactions-form.component.html',
    styleUrls: ['./transactions-form.component.sass'],
})
export class TransactionsFormComponent implements OnInit {
    @Output() submitForm: EventEmitter<{
        accountId: string;
        amount: number;
        transactionType: string;
        userId: string;
    }> = new EventEmitter<{
        accountId: string;
        amount: number;
        transactionType: string;
        userId: string;
    }>();
    @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() dataSourceChange: EventEmitter<MatTableDataSource<Transaction>> =
        new EventEmitter<MatTableDataSource<Transaction>>();
    @Output() balanceChange: EventEmitter<number> = new EventEmitter<number>();

    public dataSource = new MatTableDataSource<Transaction>();

    transactionForm: FormGroup;
    persons: Person[] = [];
    accounts: Account[] = [];
    balance = 0;

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private resetFormService: ResetFormService,
        private apiService: ApiService
    ) {
        this.transactionForm = this.fb.group({
            userId: [null, Validators.required],
            accountId: [null, Validators.required],
            amount: [null, Validators.required],
            transactionType: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.persons = res;
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

    getAccounts(userId: string) {
        this.apiService.getAccounts().subscribe((res) => {
            this.accounts = res;
            this.accounts = this.accounts.filter(
                (account: Account) => account.userId._id === userId
            );
            if (this.transactionForm.value.accountId) {
                this.updateBalance(this.transactionForm.value.accountId);
            }
        });
    }

    updateBalance(accountId: string) {
        this.balance =
            this.accounts.find((account: Account) => account._id === accountId)
                ?.balance || 0;
        this.balanceChange.emit(this.balance);
    }

    getTransactions(accountId: string) {
        this.balance =
            this.accounts.find((account: Account) => account._id === accountId)
                ?.balance || 0;

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
            this.submitForm.emit({
                accountId: this.transactionForm.value.accountId,
                amount: this.transactionForm.value.amount,
                transactionType: this.transactionForm.value.transactionType,
                userId: this.transactionForm.value.userId,
            });
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
        this.balance = 0;
        this.balanceChange.emit(this.balance);
    }
}
