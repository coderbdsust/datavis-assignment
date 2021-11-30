import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivariateDataComponent } from './multivariate-data.component';

describe('MultivariateDataComponent', () => {
  let component: MultivariateDataComponent;
  let fixture: ComponentFixture<MultivariateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultivariateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultivariateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
