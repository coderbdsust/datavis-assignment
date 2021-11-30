import { TestBed } from '@angular/core/testing';

import { Assignment3Service } from './assignment3.service';

describe('Assignment3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Assignment3Service = TestBed.get(Assignment3Service);
    expect(service).toBeTruthy();
  });
});
