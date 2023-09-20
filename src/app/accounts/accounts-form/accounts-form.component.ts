import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { ResetFormService } from '../../services/reset-form.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-accounts-form',
    templateUrl: './accounts-form.component.html',
    styleUrls: ['./accounts-form.component.sass'],
})
export class AccountsFormComponent implements OnInit {
    @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();

    accountForm: FormGroup;
    users: any;

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private resetFormService: ResetFormService,
        private apiService: ApiService
    ) {
        this.accountForm = this.fb.group({
            userId: [null, Validators.required],
            accountNumber: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.apiService.getPersons().subscribe((res) => {
            this.users = res;
        });
    }

    onSubmit() {
        if (this.accountForm.valid) {
            this.submitForm.emit(this.accountForm.value);
            this.resetFormService.resetForm(this.accountForm);
        } else {
            this.messagesService.sendMessage(
                'Formulário inválido. Não pode ser enviado.',
                'error'
            );
        }
    }

    onReset() {
        this.resetFormService.resetForm(this.accountForm);
    }
}