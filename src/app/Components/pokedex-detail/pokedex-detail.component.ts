import { Pokemon, PokemonDetails } from '../../Utils/interfaces';

import {
    Component,
    OnInit,
    AfterViewInit,
    AfterContentInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PokedexService } from '../../Services/pokedex.service';

@Component({
    selector: 'app-pokedex-detail',
    templateUrl: './pokedex-detail.component.html',
    styleUrls: ['./pokedex-detail.component.scss'],
})
export class PokedexDetailComponent implements OnInit {
    public pokemonSelected: any = undefined;
    public pokemonSelectedId: string;
    public currentSelectPokemonImage: string | null;
    public currentImageIsShiny: boolean = false;
    public currentImageIsBack: boolean = false;

    public isLoaded: boolean = false;
    public movesLoaded: boolean = false;

    public evolutionChain: any[];
    public pokemonEvolveImage: string | null;
    public pokemonEvolveSelected: any;
    public index: number;

    public startFlip: boolean = false;
    public endFlip: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private pokedexService: PokedexService
    ) {}

    ngOnInit() {
        this.checkIfLoaded();
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.pokemonSelectedId = params.get('id');
            this.index = Number(this.pokemonSelectedId);
            this.pokedexService
                .getPokemonDetailsByName(this.pokemonSelectedId)
                .subscribe(response => {
                    this.pokemonSelected = response;
                    this.currentSelectPokemonImage =
                        response.sprites.front_default;
                    this.pokemonEvolveImage = response.sprites.front_default;
                });
            this.pokedexService
                .getPokemonEvolutionChain(this.pokemonSelectedId)
                .subscribe(response => {
                    this.evolutionChain = response;
                    this.pokemonEvolutionSelected();
                });
        });
    }

    public movesHasLoaded() {
        this.movesLoaded = true;
    }

    private checkIfLoaded(): void {
        if (this.pokemonSelected !== undefined && this.movesLoaded) {
            setTimeout(() => {
                this.isLoaded = true;
                this.movesLoaded = false;
            }, 10);
            return;
        } else {
            setTimeout(() => {
                this.checkIfLoaded();
            }, 10);
        }
    }

    public pokemonEvolutionSelected() {
        for (const pokemon of this.evolutionChain) {
            const pokemonValues = Object.values(pokemon);
            if (pokemonValues[0] === Number(this.pokemonSelectedId)) {
                this.pokemonEvolveSelected = pokemon;
                this.index = this.evolutionChain.indexOf(
                    this.pokemonEvolveSelected
                );
                break;
            }
        }
    }

    public pokemonEvolveRight(): void {
        if (this.index < this.evolutionChain.length - 1) {
            this.index++;
            this.pokemonEvolveImage = this.evolutionChain[this.index].image;
        }
    }

    public canRight(): boolean {
        if (this.index < this.evolutionChain.length - 1) {
            return false;
        } else {
            return true;
        }
    }

    public pokemonEvolveLeft(): void {
        if (this.index > 0) {
            this.index--;
            this.pokemonEvolveImage = this.evolutionChain[this.index].image;
        }
    }

    public canLeft(): boolean {
        if (this.index > 0) {
            return false;
        } else {
            return true;
        }
    }

    public getPercentage(numb: number): string {
        const highestStat = 200;
        const result = (numb / highestStat) * 100 + '%';
        return result;
    }

    public switchShiny(): void {
        this.currentImageIsShiny = !this.currentImageIsShiny;
        if (this.currentImageIsShiny === false) {
            if (this.currentImageIsBack === false) {
                this.currentSelectPokemonImage = this.pokemonSelected.sprites.front_default;
            } else {
                this.currentSelectPokemonImage = this.pokemonSelected.sprites.back_default;
            }
        } else {
            if (this.currentImageIsBack === false) {
                this.currentSelectPokemonImage = this.pokemonSelected.sprites.front_shiny;
            } else {
                this.currentSelectPokemonImage = this.pokemonSelected.sprites.back_shiny;
            }
        }
    }

    public switchBack(): void {
        this.currentImageIsBack = !this.currentImageIsBack;
        let finalImage;
        if (this.currentImageIsBack === false) {
            if (this.currentImageIsShiny === false) {
                finalImage = this.pokemonSelected.sprites.front_default;
            } else {
                finalImage = this.pokemonSelected.sprites.front_shiny;
            }
        } else {
            if (this.currentImageIsShiny === false) {
                finalImage = this.pokemonSelected.sprites.back_default;
            } else {
                finalImage = this.pokemonSelected.sprites.back_shiny;
            }
        }
        this.startFlip = true;
        setTimeout(() => {
            this.startFlip = false;
            this.endFlip = true;
            this.currentSelectPokemonImage = finalImage;
            setTimeout(() => {
                this.endFlip = false;
            }, 200);
        }, 200);
    }

    public goBack(): void {
        this.location.back();
    }

    public cleanPokemonData(evolution = false, index = 0) {
        if (!evolution) {
            this.isLoaded = false;
            this.movesLoaded = false;
            this.checkIfLoaded();
            this.pokemonSelected = undefined;
            this.evolutionChain = undefined;
        }
        if (
            evolution &&
            this.evolutionChain[index].id !== this.pokemonSelected.id
        ) {
            this.isLoaded = false;
            this.movesLoaded = false;
            this.checkIfLoaded();
            this.pokemonSelected = undefined;
            this.evolutionChain = undefined;
        }
    }
}
