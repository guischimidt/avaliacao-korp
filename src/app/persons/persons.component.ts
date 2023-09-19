import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ResetFormService } from '../services/reset-form.service';
import { MessagesService } from '../services/messages.service';

import { Person } from '../models/person';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.sass'],
})
export class PersonsComponent implements OnInit {
    displayedColumns: string[] = ['name', 'cpf', 'address'];
    public dataSource = new MatTableDataSource<Person>();

    person: Person[] = [];
    personForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private resetFormService: ResetFormService,
        private messagesService: MessagesService
    ) {
        this.personForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(7)]],
            cpf: [
                '',
                [
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                ],
            ],
            address: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.dataSource.data = res;
        });
    }

    onSubmit() {
        if (this.personForm.valid) {
            this.apiService.savePerson(this.personForm.value).subscribe({
                next: () => {
                    this.messagesService.sendMessage(
                        'Pessoa cadastrada com sucesso',
                        'success'
                    );

                    this.resetForm();
                    this.ngOnInit();
                },
                error: (error) => {
                    this.messagesService.sendMessage(error.message, 'error');
                },
            });
        } else {
            this.messagesService.sendMessage(
                'Formulário inválido. Não pode ser enviado.',
                'error'
            );
        }
    }

    resetForm() {
        this.resetFormService.resetForm(this.personForm);
    }
}
