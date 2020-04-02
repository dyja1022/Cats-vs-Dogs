import { TestBed } from '@angular/core/testing';

import { SwitchPageService } from './switch-page.service';

describe('SwitchPageService', () => {
  let service: SwitchPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
