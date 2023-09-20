import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { MessagesModule } from '../shared/messages/messages.module';

import { AccountsComponent } from './accounts.component';
import { AccountsFormComponent } from './accounts-form/accounts-form.component';
import { AccountsTableComponent } from './accounts-table/accounts-table.component';

@NgModule({
    declarations: [
        AccountsComponent,
        AccountsFormComponent,
        AccountsTableComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MessagesModule,
        NgxMaskDirective,
        NgxMaskPipe,
        RouterModule.forChild([
            {
                path: '',
                component: AccountsComponent,
                children: [
                    { path: 'form', component: AccountsFormComponent },
                    { path: 'table', component: AccountsTableComponent },
                    { path: '', redirectTo: 'form', pathMatch: 'full' },
                ],
            },
        ]),
    ],
    providers: [provideNgxMask()],
})
export class AccountsModule {}
