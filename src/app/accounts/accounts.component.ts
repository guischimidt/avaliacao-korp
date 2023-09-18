import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';

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
        private apiService: ApiService
    ) {
        this.accountForm = this.fb.group({
            userId: [null],
            accountNumber: [null],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            console.log(res);
            this.users = res;
            console.log(this.users);
        });

        this.apiService.getAccounts().subscribe((res) => {
            console.log(res);
            this.dataSource.data = res;
            console.log(this.dataSource.data);
        });
    }

    message = '';
    type = '';

    onSubmit() {
        if (this.accountForm.valid) {
            console.log(this.accountForm.value);
            this.apiService.saveAccount(this.accountForm.value).subscribe({
                next: () => {
                    this.message = 'Pessoa cadastrada com sucesso';
                    this.type = 'success';
                    this.clear();
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

    clear() {
        console.log('Limpar');
    }
}
