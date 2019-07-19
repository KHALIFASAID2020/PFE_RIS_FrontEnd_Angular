import { TestBed } from '@angular/core/testing';

import { GroupcongratulationsService } from './groupcongratulations.service';

describe('GroupcongratulationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupcongratulationsService = TestBed.get(GroupcongratulationsService);
    expect(service).toBeTruthy();
  });
});
