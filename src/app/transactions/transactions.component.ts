import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ResetFormService } from '../services/reset-form.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.sass'],
})
export class TransactionsComponent implements OnInit {
    transactionForm: FormGroup;
    users: any;
    accounts: any;

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
                this.apiService.getAccounts().subscribe((res) => {
                    this.accounts = res;
                    this.accounts = this.accounts.filter(
                        (account: { userId: { _id: any } }) =>
                            account.userId._id === userId
                    );
                });
            }
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
                        this.resetForm();
                        this.ngOnInit();
                    },
                    error: (error) => {
                        this.message = error.message;
                        this.type = 'error';
                    },
                });
        } else {
            console.log('Formulário inválido. Não pode ser enviado.');
        }
    }

    resetForm() {
        this.resetFormService.resetForm(this.transactionForm);
    }
}
