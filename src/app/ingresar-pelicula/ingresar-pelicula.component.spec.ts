import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPeliculaComponent } from './ingresar-pelicula.component';

describe('IngresarPeliculaComponent', () => {
  let component: IngresarPeliculaComponent;
  let fixture: ComponentFixture<IngresarPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresarPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
