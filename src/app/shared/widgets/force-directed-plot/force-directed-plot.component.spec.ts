import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceDirectedPlotComponent } from './force-directed-plot.component';

describe('ForceDirectedPlotComponent', () => {
  let component: ForceDirectedPlotComponent;
  let fixture: ComponentFixture<ForceDirectedPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceDirectedPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceDirectedPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
