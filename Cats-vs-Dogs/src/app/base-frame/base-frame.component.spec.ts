import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFrameComponent } from './base-frame.component';

describe('BaseFrameComponent', () => {
  let component: BaseFrameComponent;
  let fixture: ComponentFixture<BaseFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
