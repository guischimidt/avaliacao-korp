import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ResetFormService } from '../services/reset-form.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.sass'],
})
export class AccountsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'cpf', 'accountNumber'];
    public dataSource = new MatTableDataSource<any>();

    accountForm: FormGroup;
    users: any;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private resetFormService: ResetFormService
    ) {
        this.accountForm = this.fb.group({
            userId: [null, Validators.required],
            accountNumber: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.users = res;
        });

        this.apiService.getAccounts().subscribe((res) => {
            this.dataSource.data = res;
        });
    }

    message = '';
    type = '';

    onSubmit() {
        if (this.accountForm.valid) {
            this.apiService.saveAccount(this.accountForm.value).subscribe({
                next: () => {
                    this.message = 'Conta cadastrada com sucesso';
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
            this.message = 'Formulário inválido. Não pode ser enviado.';
            this.type = 'error';
        }
    }

    resetForm() {
        this.resetFormService.resetForm(this.accountForm);
    }
}
