import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterByUseNameComponent } from './register-by-use-name.component';

describe('RegisterByUseNameComponent', () => {
  let component: RegisterByUseNameComponent;
  let fixture: ComponentFixture<RegisterByUseNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterByUseNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterByUseNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
