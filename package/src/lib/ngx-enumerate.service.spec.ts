import { TestBed, inject } from '@angular/core/testing';

import { NgxEnumerateService } from './ngx-enumerate.service';

describe('NgxEnumerateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxEnumerateService]
    });
  });

  it('should be created', inject([NgxEnumerateService], (service: NgxEnumerateService) => {
    expect(service).toBeTruthy();
  }));
});
