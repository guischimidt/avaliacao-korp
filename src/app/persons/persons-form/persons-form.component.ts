import {
    Component,
    Output,
    EventEmitter,
    OnChanges,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from '../../services/messages.service';
import { ResetFormService } from '../../services/reset-form.service';

import { CPFValidator } from '../../shared/cpf.validator';

@Component({
    selector: 'app-persons-form',
    templateUrl: './persons-form.component.html',
    styleUrls: ['./persons-form.component.sass'],
})
export class PersonsFormComponent implements OnChanges {
    @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();
    @Input() formData: any;

    personForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private resetFormService: ResetFormService
    ) {
        this.personForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(7)]],
            // Custom validator
            cpf: ['', [Validators.required, CPFValidator.isValidCpf()]],
            address: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    ngOnChanges() {
        if (this.formData) {
            this.personForm.patchValue(this.formData);
        }
        console.log(this.formData);
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
