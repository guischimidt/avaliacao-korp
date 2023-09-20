import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.sass'],
})
export class TransactionsTableComponent {
    @Input() dataSource: MatTableDataSource<any> =
        new MatTableDataSource<any>();
    @Input() balance: any;
    displayedColumns: string[] = ['date', 'type', 'amount'];
}
