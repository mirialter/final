import { TestBed } from '@angular/core/testing';

import { TransitionSrviceService } from './transition-srvice.service';

describe('TransitionSrviceService', () => {
  let service: TransitionSrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransitionSrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
