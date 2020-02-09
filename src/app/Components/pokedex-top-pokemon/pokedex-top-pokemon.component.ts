import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PokedexService } from 'src/app/Services/pokedex.service';

@Component({
    selector: 'app-pokedex-top-pokemon',
    templateUrl: './pokedex-top-pokemon.component.html',
    styleUrls: ['./pokedex-top-pokemon.component.scss'],
})
export class PokedexTopPokemonComponent implements OnInit {
    public statsButtons: string[] = [
        'speed',
        'sdefense',
        'sattack',
        'defense',
        'attack',
        'hp',
        'average',
    ];
    public topArr: any[] = [];
    public selectedStat = 6;

    public isLoaded: boolean = false;

    constructor(private pokedexService: PokedexService) {}

    ngOnInit() {
        this.checkIfLoaded();
        this.pokedexService.getTopTenPokemon().subscribe((response: any) => {
            this.topArr = response;
        });
    }

    private checkIfLoaded(): void {
        if (this.topArr.length !== 0) {
            setTimeout(() => {
                this.isLoaded = true;
            }, 100);
            return;
        } else {
            setTimeout(() => {
                this.checkIfLoaded();
            }, 10);
        }
    }

    public getPercentage(numb: number): string {
        const highestStat = 200;
        const result = (numb / highestStat) * 100 + '%';
        return result;
    }

    public selectStat(statIndex: number): void {
        this.selectedStat = statIndex;
    }
}
