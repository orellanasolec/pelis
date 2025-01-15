import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPeliculaComponent } from './buscar-pelicula.component';

describe('BuscarPeliculaComponent', () => {
  let component: BuscarPeliculaComponent;
  let fixture: ComponentFixture<BuscarPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
