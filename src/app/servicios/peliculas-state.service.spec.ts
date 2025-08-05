import { TestBed } from '@angular/core/testing';

import { PeliculasStateService } from './peliculas-state.service';

describe('PeliculasStateService', () => {
  let service: PeliculasStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
