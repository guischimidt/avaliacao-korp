import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../models/person';

@Component({
    selector: 'app-persons-table',
    templateUrl: './persons-table.component.html',
    styleUrls: ['./persons-table.component.sass'],
})
export class PersonsTableComponent {
    @Input() dataSource: MatTableDataSource<Person> =
        new MatTableDataSource<Person>();
    displayedColumns: string[] = ['name', 'cpf', 'address'];
}
