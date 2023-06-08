import { TestBed } from '@angular/core/testing';

import { AuthduardGuard } from './authduard.guard';

describe('AuthduardGuard', () => {
  let guard: AuthduardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthduardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
