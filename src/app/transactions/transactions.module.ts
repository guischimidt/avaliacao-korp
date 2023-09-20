import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { TransactionsComponent } from './transactions.component';
import { MessagesModule } from '../shared/messages/messages.module';
import { TransactionsFormComponent } from './transactions-form/transactions-form.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';

@NgModule({
    declarations: [
        TransactionsComponent,
        TransactionsFormComponent,
        TransactionsTableComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMaskDirective,
        NgxMaskPipe,
        MessagesModule,
        RouterModule.forChild([
            {
                path: '',
                component: TransactionsComponent,
                children: [
                    { path: 'form', component: TransactionsFormComponent },
                    { path: 'table', component: TransactionsTableComponent },
                    { path: '', redirectTo: 'form', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    providers: [provideNgxMask()],
})
export class TransactionsModule {}
