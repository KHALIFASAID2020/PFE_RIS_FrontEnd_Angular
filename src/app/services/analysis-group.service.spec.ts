import { TestBed } from '@angular/core/testing';

import { AnalysisGroupService } from './analysis-group.service';

describe('AnalysisGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalysisGroupService = TestBed.get(AnalysisGroupService);
    expect(service).toBeTruthy();
  });
});
