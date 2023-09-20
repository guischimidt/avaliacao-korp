import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../services/api.service';
import { MessagesService } from '../services/messages.service';

import { Person } from '../models/person';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.sass'],
})
export class PersonsComponent implements OnInit {
    public dataSource = new MatTableDataSource<Person>();

    constructor(
        private apiService: ApiService,
        private messagesService: MessagesService
    ) {}

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.dataSource.data = res;
        });
    }

    onSubmitForm(formData: any) {
        if (formData) {
            this.apiService.savePerson(formData).subscribe({
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

    onDelete(userId: any) {
        if (userId) {
            this.apiService.deletePerson(userId).subscribe({
                next: () => {
                    this.messagesService.sendMessage(
                        'Pessoa deletada com sucesso',
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
        this.apiService.getPersons().subscribe((res) => {
            this.dataSource.data = res;
        });
    }
}
