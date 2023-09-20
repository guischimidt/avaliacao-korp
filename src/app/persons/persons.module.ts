import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { MessagesModule } from '../shared/messages/messages.module';

import { PersonsComponent } from './persons.component';
import { PersonsTableComponent } from './persons-table/persons-table.component';
import { PersonsFormComponent } from './persons-form/persons-form.component';

@NgModule({
    declarations: [
        PersonsComponent,
        PersonsTableComponent,
        PersonsFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        NgxMaskDirective,
        NgxMaskPipe,
        MessagesModule,
        RouterModule.forChild([
            {
                path: '',
                component: PersonsComponent,
                children: [
                    { path: 'form', component: PersonsFormComponent },
                    { path: 'table', component: PersonsTableComponent },
                    { path: '', redirectTo: 'form', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    providers: [provideNgxMask()],
})
export class PersonsModule {}
