import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexPokeworldComponent } from './pokedex-pokeworld.component';

describe('PokedexPokeworldComponent', () => {
    let component: PokedexPokeworldComponent;
    let fixture: ComponentFixture<PokedexPokeworldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokedexPokeworldComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexPokeworldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
