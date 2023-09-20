import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsFormComponent } from './accounts-form.component';

describe('AccountsFormComponent', () => {
    let component: AccountsFormComponent;
    let fixture: ComponentFixture<AccountsFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccountsFormComponent]
        });
        fixture = TestBed.createComponent(AccountsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
