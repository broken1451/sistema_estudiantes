import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateByEmailComponent } from './update-by-email.component';

describe('UpdateByEmailComponent', () => {
  let component: UpdateByEmailComponent;
  let fixture: ComponentFixture<UpdateByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateByEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
