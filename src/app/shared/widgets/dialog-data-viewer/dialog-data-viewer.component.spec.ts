import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataViewerComponent } from './dialog-data-viewer.component';

describe('DialogDataViewerComponent', () => {
  let component: DialogDataViewerComponent;
  let fixture: ComponentFixture<DialogDataViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDataViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
