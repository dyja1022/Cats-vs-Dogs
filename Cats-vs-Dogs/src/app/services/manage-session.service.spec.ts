import { TestBed } from '@angular/core/testing';

import { ManageSessionService } from './manage-session.service';

describe('ManageSessionService', () => {
  let service: ManageSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
