import { TestBed } from '@angular/core/testing';

import { ManageStatusService } from './manage-status.service';

describe('ManageStatusService', () => {
  let service: ManageStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
