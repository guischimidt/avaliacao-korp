import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

import { Person } from '../models/person';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.sass'],
})
export class PersonsComponent implements OnInit {
    person: Person[] = [];

    personForm: FormGroup;
    displayedColumns: string[] = ['name', 'cpf', 'address'];
    public dataSource = new MatTableDataSource<Person>();

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService
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
        this.personForm.reset();

        Object.keys(this.personForm.controls).forEach((key) => {
            this.personForm.controls[key].setErrors(null);
        });
    }
}
