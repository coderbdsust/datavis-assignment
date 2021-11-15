import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarplotComponent } from './starplot.component';

describe('StarplotComponent', () => {
  let component: StarplotComponent;
  let fixture: ComponentFixture<StarplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
