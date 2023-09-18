import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { MessagesModule } from '../shared/messages/messages.module';

import { PersonsComponent } from './persons.component';

@NgModule({
    declarations: [PersonsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        NgxMaskDirective,
        NgxMaskPipe,
        MessagesModule,
    ],
    providers: [provideNgxMask()],
})
export class PersonsModule {}
