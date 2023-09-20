import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsFormComponent } from './transactions-form.component';

describe('TransactionsFormComponent', () => {
    let component: TransactionsFormComponent;
    let fixture: ComponentFixture<TransactionsFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TransactionsFormComponent],
        });
        fixture = TestBed.createComponent(TransactionsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
