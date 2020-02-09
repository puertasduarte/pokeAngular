import { TestBed } from '@angular/core/testing';
import { PokedexService } from './pokedex.service';
import { HttpClientModule } from '@angular/common/http';
import { value, valueSteel } from '../Utils/filter-name-value';

describe('PokemonService', () => {
    let pokemonService: PokedexService;
    const pokemonList = value;
    const pokemonSteelList = valueSteel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [PokedexService],
        });
        pokemonService = TestBed.get(PokedexService);
    });

    it('should return name of ditto', (done: DoneFn) => {
        const testName = 'ditto';
        pokemonService.getPokemonDetailsByName('ditto').subscribe(data => {
            expect(data.name).toEqual(testName);
            done();
        });
    });

    it('should return height of ditto', (done: DoneFn) => {
        const testHeight = 3;
        pokemonService.getPokemonDetailsByName('ditto').subscribe(data => {
            expect(data.height).toEqual(testHeight);
            done();
        });
    });

    it('test if 10 first pokemon of getPokemonList are correct', (done: DoneFn) => {
        const pokemonListInitialTen = pokemonList.slice(0, 10);
        pokemonService.getPokemonList().subscribe(data => {
            expect(data.slice(0, 10)).toEqual(pokemonListInitialTen);
            done();
        });
    });

    it('test if list pokemon by type steel work', (done: DoneFn) => {
        const pokemonListInitialTen = pokemonList.slice(0, 10);
        pokemonService.getPokemonByType('steel').subscribe(data => {
            expect(data).toEqual(pokemonSteelList);
            done();
        });
    });
});
