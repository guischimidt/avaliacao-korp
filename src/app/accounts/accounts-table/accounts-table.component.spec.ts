import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsTableComponent } from './accounts-table.component';

describe('AccountsTableComponent', () => {
    let component: AccountsTableComponent;
    let fixture: ComponentFixture<AccountsTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccountsTableComponent]
        });
        fixture = TestBed.createComponent(AccountsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
