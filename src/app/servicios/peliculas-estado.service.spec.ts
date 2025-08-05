import { TestBed } from '@angular/core/testing';

import { PeliculasEstadoService } from './peliculas-estado.service';

describe('PeliculasEstadoService', () => {
  let service: PeliculasEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
