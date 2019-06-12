import { TestBed } from '@angular/core/testing';

import { ActionPlanService } from './action-plan.service';

describe('ActionPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionPlanService = TestBed.get(ActionPlanService);
    expect(service).toBeTruthy();
  });
});
