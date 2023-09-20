import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { MessagesService } from '../services/messages.service';

import { Person } from '../models/person';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.sass'],
})
export class AccountsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'cpf', 'accountNumber'];
    public dataSource = new MatTableDataSource<any>();

    accountForm: FormGroup;
    persons: Person[] = [];

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private messagesService: MessagesService
    ) {
        this.accountForm = this.fb.group({
            userId: [null, Validators.required],
            accountNumber: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.persons = res;
        });

        this.apiService.getAccounts().subscribe((res) => {
            this.dataSource.data = res;
        });
    }

    onSubmitForm(formData: any) {
        if (formData) {
            this.apiService.saveAccount(formData).subscribe({
                next: () => {
                    this.messagesService.sendMessage(
                        'Pessoa cadastrada com sucesso',
                        'success'
                    );

                    this.refreshTable();
                },
                error: (error) => {
                    this.messagesService.sendMessage(error.message, 'error');
                },
            });
        }
    }

    private refreshTable() {
        this.apiService.getAccounts().subscribe((res) => {
            this.dataSource.data = res;
        });
    }
}
