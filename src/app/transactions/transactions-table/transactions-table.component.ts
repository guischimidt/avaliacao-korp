import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Transaction } from '../../models/transaction';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.sass'],
})
export class TransactionsTableComponent {
    @Input() dataSource: MatTableDataSource<Transaction> =
        new MatTableDataSource<Transaction>();
    @Input() balance = 0;
    displayedColumns: string[] = ['date', 'type', 'amount'];
}
