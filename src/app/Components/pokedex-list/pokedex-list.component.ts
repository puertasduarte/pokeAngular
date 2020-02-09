import { Pokemon, PokemonDetails } from '../../Utils/interfaces';
import { Router, Event, NavigationEnd } from '@angular/router';

import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import { PokedexDetailComponent } from '../pokedex-detail/pokedex-detail.component';

@Component({
    selector: 'app-pokedex-list',
    templateUrl: './pokedex-list.component.html',
    styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit, OnChanges {
    @Input() pokemonList: Pokemon[];
    @Input() pokemonSelected: PokemonDetails;

    @Output() choosePokemonEvent = new EventEmitter<object>();
    @Output() chooseTypeEvent = new EventEmitter<object>();

    public selectType: any;
    public term: any;

    private doOnce: boolean = false;
    public isLoaded: boolean = false;

    public localPokemon: Pokemon;
    private currentListIndex = 0;
    public currentSelectPokemonImage: string = undefined;
    private currentImageIsShiny = true;
    private storagePokemonKey = 'localPokemon';
    public pokemonTypes: string[] = [
        'all',
        'normal',
        'fighting',
        'flying',
        'poison',
        'ground',
        'rock',
        'bug',
        'steel',
        'fire',
        'water',
        'grass',
        'electric',
        'psychic',
        'ghost',
        'ice',
        'dark',
        'fairy',
    ];

    constructor(private router: Router) {}

    ngOnInit() {
        this.checkIfLoaded();
    }

    ngOnChanges() {
        // if (!this.doOnce) {
        //     this.doOnce = true;
        //     this.checkPokemonSelected();
        // }
    }

    private isScrolledIntoView(elem) {
        const rect = elem.getBoundingClientRect();
        console.log(rect);
        return rect.top >= 260 && rect.bottom <= 460;
    }

    private scrollIntoListElem() {
        const elemNode = document.getElementsByClassName(
            'pokemon-list__item--selected'
        )[0];
        if (!this.isScrolledIntoView(elemNode)) {
            elemNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    private checkIfLoaded(): void {
        if (this.pokemonList !== undefined) {
            setTimeout(() => {
                this.checkPokemonSelected();
                this.isLoaded = true;
            }, 200);
            return;
        } else {
            setTimeout(() => {
                this.checkIfLoaded();
            }, 200);
        }
    }

    private checkPokemonSelected(): void {
        if (window.sessionStorage[this.storagePokemonKey] === undefined) {
            this.localPokemon = this.pokemonList[0];
            this.choosePokemon(this.pokemonList[0]);
            window.sessionStorage[this.storagePokemonKey] = JSON.stringify(
                this.localPokemon
            );
        } else {
            this.localPokemon = JSON.parse(
                window.sessionStorage[this.storagePokemonKey]
            );
            this.choosePokemon(this.localPokemon);
        }
    }

    private updateStorage(): void {
        window.sessionStorage[this.storagePokemonKey] = JSON.stringify(
            this.localPokemon
        );
    }

    public choosePokemon(pokemon: Pokemon): void {
        this.currentSelectPokemonImage = pokemon.image;
        this.localPokemon = pokemon;
        this.updateStorage();
        if (this.pokemonList !== undefined) {
            this.currentListIndex = this.pokemonList.findIndex(
                (x: any) => x.id === this.localPokemon.id
            );
        }
        this.choosePokemonEvent.emit(pokemon);
    }

    public chooseType(type): void {
        this.currentListIndex = 0;
        this.chooseTypeEvent.emit(type);
    }

    public onChange(type: string): void {
        this.updateStorage();
        this.chooseType(type);
        this.choosePokemon(this.pokemonList[this.currentListIndex]);
    }

    public leftArrow(): void {
        if (this.currentListIndex > 0) {
            this.choosePokemon(this.pokemonList[this.currentListIndex - 1]);
            this.scrollIntoListElem();
        }
    }

    public rightArrow(): void {
        if (this.currentListIndex < this.pokemonList.length - 1) {
            this.choosePokemon(this.pokemonList[this.currentListIndex + 1]);
            this.scrollIntoListElem();
        }
    }

    public switchShiny(): void {
        if (this.currentImageIsShiny === false) {
            this.currentSelectPokemonImage = this.pokemonSelected.sprites.front_default;
        } else {
            this.currentSelectPokemonImage = this.pokemonSelected.sprites.front_shiny;
        }
        this.currentImageIsShiny = !this.currentImageIsShiny;
    }
}
