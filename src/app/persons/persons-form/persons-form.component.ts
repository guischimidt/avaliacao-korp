import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { ResetFormService } from '../../services/reset-form.service';

@Component({
    selector: 'app-persons-form',
    templateUrl: './persons-form.component.html',
    styleUrls: ['./persons-form.component.sass'],
})
export class PersonsFormComponent {
    @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();

    personForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private resetFormService: ResetFormService
    ) {
        this.personForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(7)]],
            cpf: [
                '',
                [
                    Validators.required,
                    Validators.minLength(11),
                    Validators.maxLength(11),
                ],
            ],
            address: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    onSubmit() {
        if (this.personForm.valid) {
            this.submitForm.emit(this.personForm.value);
            this.resetFormService.resetForm(this.personForm);
        } else {
            this.messagesService.sendMessage(
                'Formulário inválido. Não pode ser enviado.',
                'error'
            );
        }
    }

    onReset() {
        this.resetFormService.resetForm(this.personForm);
    }
}
