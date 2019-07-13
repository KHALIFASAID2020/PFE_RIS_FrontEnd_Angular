import { TestBed } from '@angular/core/testing';

import { DocumentStandarisationService } from './document-standarisation.service';

describe('DocumentStandarisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentStandarisationService = TestBed.get(DocumentStandarisationService);
    expect(service).toBeTruthy();
  });
});
