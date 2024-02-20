import { TestBed } from '@angular/core/testing';

import { ApiImagenService } from './api-imagen.service';

describe('ApiImagenService', () => {
  let service: ApiImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
