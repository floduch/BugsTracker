/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BugServiceService } from './bug.service';

describe('Service: BugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BugServiceService]
    });
  });

  it('should ...', inject([BugServiceService], (service: BugServiceService) => {
    expect(service).toBeTruthy();
  }));
});
