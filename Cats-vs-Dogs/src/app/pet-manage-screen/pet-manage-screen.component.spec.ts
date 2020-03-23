import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetManageScreenComponent } from './pet-manage-screen.component';

describe('PetManageScreenComponent', () => {
  let component: PetManageScreenComponent;
  let fixture: ComponentFixture<PetManageScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetManageScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetManageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
