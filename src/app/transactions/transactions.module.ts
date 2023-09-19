import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { TransactionsComponent } from './transactions.component';
import { MessagesModule } from '../shared/messages/messages.module';

@NgModule({
    declarations: [TransactionsComponent],
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
    ],
    providers: [provideNgxMask()],
})
export class TransactionsModule {}
