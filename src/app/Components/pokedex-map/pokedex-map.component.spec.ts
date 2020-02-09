import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexMapComponent } from './pokedex-map.component';

describe('PokedexMapComponent', () => {
    let component: PokedexMapComponent;
    let fixture: ComponentFixture<PokedexMapComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokedexMapComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
