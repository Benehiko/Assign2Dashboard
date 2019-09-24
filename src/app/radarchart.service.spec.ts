import { TestBed } from '@angular/core/testing';

import { RadarchartService } from './radarchart.service';

describe('RadarchartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadarchartService = TestBed.get(RadarchartService);
    expect(service).toBeTruthy();
  });
});
