import { TestBed } from '@angular/core/testing';

import { RootCauseService } from './root-cause.service';

describe('RootCauseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootCauseService = TestBed.get(RootCauseService);
    expect(service).toBeTruthy();
  });
});
