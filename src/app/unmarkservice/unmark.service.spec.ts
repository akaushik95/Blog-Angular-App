import { TestBed, inject } from '@angular/core/testing';

import { UnmarkService } from './unmark.service';

describe('UnmarkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnmarkService]
    });
  });

  it('should be created', inject([UnmarkService], (service: UnmarkService) => {
    expect(service).toBeTruthy();
  }));
});
