import { TestBed } from '@angular/core/testing';

import { StaffdataService } from './staffdata.service';

describe('StaffdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffdataService = TestBed.get(StaffdataService);
    expect(service).toBeTruthy();
  });
});
