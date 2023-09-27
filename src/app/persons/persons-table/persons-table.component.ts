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
    @Output() deleteClicked: EventEmitter<string> = new EventEmitter<string>();
    @Output() editClicked: EventEmitter<Person> = new EventEmitter<Person>();

    onDelete(userId: string) {
        this.deleteClicked.emit(userId);
    }

    onEdit(userData: Person) {
        this.editClicked.emit(userData);
    }
    displayedColumns: string[] = ['name', 'cpf', 'address', 'edit', 'delete'];
}
