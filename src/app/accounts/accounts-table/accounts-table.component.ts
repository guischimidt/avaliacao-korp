import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Person } from '../../models/person';

@Component({
    selector: 'app-accounts-table',
    templateUrl: './accounts-table.component.html',
    styleUrls: ['./accounts-table.component.sass'],
})
export class AccountsTableComponent {
    @Input() dataSource: MatTableDataSource<Person> =
        new MatTableDataSource<Person>();
    displayedColumns: string[] = ['name', 'cpf', 'accountNumber'];
}
