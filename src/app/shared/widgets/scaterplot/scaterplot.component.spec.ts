import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaterplotComponent } from './scaterplot.component';

describe('ScaterplotComponent', () => {
  let component: ScaterplotComponent;
  let fixture: ComponentFixture<ScaterplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaterplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaterplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
