import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { ResetFormService } from '../services/reset-form.service';

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
        private resetFormService: ResetFormService
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
            console.log(res);
            this.dataSource.data = res;
            console.log(this.dataSource.data);
        });
    }

    message = '';
    type = '';

    onSubmit() {
        if (this.personForm.valid) {
            this.apiService.savePerson(this.personForm.value).subscribe({
                next: () => {
                    this.message = 'Pessoa cadastrada com sucesso';
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
        this.resetFormService.resetForm(this.personForm);
    }
}
