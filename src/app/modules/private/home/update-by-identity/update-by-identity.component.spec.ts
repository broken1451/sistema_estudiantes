import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateByIdentityComponent } from './update-by-identity.component';

describe('UpdateByIdentityComponent', () => {
  let component: UpdateByIdentityComponent;
  let fixture: ComponentFixture<UpdateByIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateByIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateByIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
