import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterByIdentityComponent } from './register-by-identity.component';

describe('RegisterByIdentityComponent', () => {
  let component: RegisterByIdentityComponent;
  let fixture: ComponentFixture<RegisterByIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterByIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterByIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
