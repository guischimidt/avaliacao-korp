import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ResetFormService {
    resetForm(form: FormGroup) {
        form.reset();

        Object.keys(form.controls).forEach((key) => {
            form.controls[key].setErrors(null);
        });
    }
}
