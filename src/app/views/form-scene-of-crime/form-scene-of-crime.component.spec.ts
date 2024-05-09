import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSceneOfCrimeComponent } from './form-scene-of-crime.component';

describe('FormSceneOfCrimeComponent', () => {
  let component: FormSceneOfCrimeComponent;
  let fixture: ComponentFixture<FormSceneOfCrimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSceneOfCrimeComponent]
    });
    fixture = TestBed.createComponent(FormSceneOfCrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
