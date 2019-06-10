import { TestBed } from '@angular/core/testing';

import { SentcomplaintService } from './sentcomplaint.service';

describe('SentcomplaintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentcomplaintService = TestBed.get(SentcomplaintService);
    expect(service).toBeTruthy();
  });
});
