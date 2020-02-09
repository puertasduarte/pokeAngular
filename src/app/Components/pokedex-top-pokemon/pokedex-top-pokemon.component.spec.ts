import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexTopPokemonComponent } from './pokedex-top-pokemon.component';

describe('PokedexTopPokemonComponent', () => {
    let component: PokedexTopPokemonComponent;
    let fixture: ComponentFixture<PokedexTopPokemonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokedexTopPokemonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexTopPokemonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
