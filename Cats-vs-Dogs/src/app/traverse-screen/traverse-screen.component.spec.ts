import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraverseScreenComponent } from './traverse-screen.component';

describe('TraverseScreenComponent', () => {
  let component: TraverseScreenComponent;
  let fixture: ComponentFixture<TraverseScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraverseScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraverseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
