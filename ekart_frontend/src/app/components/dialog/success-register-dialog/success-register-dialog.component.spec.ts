import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRegisterDialogComponent } from './success-register-dialog.component';

describe('SuccessRegisterDialogComponent', () => {
  let component: SuccessRegisterDialogComponent;
  let fixture: ComponentFixture<SuccessRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessRegisterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
