import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() deleteClicked = new EventEmitter<void>();

    onDelete(userId: any) {
        this.deleteClicked.emit(userId);
    }
    displayedColumns: string[] = ['name', 'cpf', 'address', 'edit', 'delete'];
}
