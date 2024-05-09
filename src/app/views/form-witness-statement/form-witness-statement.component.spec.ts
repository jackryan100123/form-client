import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWitnessStatementComponent } from './form-witness-statement.component';

describe('FormWitnessStatementComponent', () => {
  let component: FormWitnessStatementComponent;
  let fixture: ComponentFixture<FormWitnessStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormWitnessStatementComponent]
    });
    fixture = TestBed.createComponent(FormWitnessStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
