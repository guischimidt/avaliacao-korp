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
    selectedUserData: any;

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
            if (this.selectedUserData) {
                this.apiService
                    .updatePerson(this.selectedUserData._id, formData)
                    .subscribe({
                        next: () => {
                            this.messagesService.sendMessage(
                                'Pessoa editada com sucesso',
                                'success'
                            );
                            this.selectedUserData = null;
                            this.refreshTable();
                        },
                        error: (error) => {
                            this.messagesService.sendMessage(
                                error.message,
                                'error'
                            );
                        },
                    });
            } else {
                this.apiService.savePerson(formData).subscribe({
                    next: () => {
                        this.messagesService.sendMessage(
                            'Pessoa cadastrada com sucesso',
                            'success'
                        );

                        this.refreshTable();
                    },
                    error: (error) => {
                        this.messagesService.sendMessage(
                            error.message,
                            'error'
                        );
                    },
                });
            }
        }
    }

    onDelete(userId: string) {
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

    onEdit(userData: Person) {
        this.selectedUserData = userData;
    }

    private refreshTable() {
        this.apiService.getPersons().subscribe((res) => {
            this.dataSource.data = res;
        });
    }
}
