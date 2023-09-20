import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-accounts-table',
    templateUrl: './accounts-table.component.html',
    styleUrls: ['./accounts-table.component.sass'],
})
export class AccountsTableComponent {
    @Input() dataSource: MatTableDataSource<any> =
        new MatTableDataSource<any>();
    displayedColumns: string[] = ['name', 'cpf', 'accountNumber'];
}
