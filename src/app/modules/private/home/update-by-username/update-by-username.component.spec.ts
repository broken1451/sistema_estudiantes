import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateByUsernameComponent } from './update-by-username.component';

describe('UpdateByUsernameComponent', () => {
  let component: UpdateByUsernameComponent;
  let fixture: ComponentFixture<UpdateByUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateByUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateByUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
