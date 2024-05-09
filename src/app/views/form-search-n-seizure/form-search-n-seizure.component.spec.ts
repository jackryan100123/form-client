import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchNSeizureComponent } from './form-search-n-seizure.component';

describe('FormSearchNSeizureComponent', () => {
  let component: FormSearchNSeizureComponent;
  let fixture: ComponentFixture<FormSearchNSeizureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSearchNSeizureComponent]
    });
    fixture = TestBed.createComponent(FormSearchNSeizureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
