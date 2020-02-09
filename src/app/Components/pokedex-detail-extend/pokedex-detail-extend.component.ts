import {
    Component,
    OnInit,
    Input,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import { PokedexService } from '../../Services/pokedex.service';
import {
    Observable,
    of,
    throwError,
    pipe,
    forkJoin,
    combineLatest,
} from 'rxjs';
import { take, map, combineAll } from 'rxjs/operators';

@Component({
    selector: 'app-pokedex-detail-extend',
    templateUrl: './pokedex-detail-extend.component.html',
    styleUrls: ['./pokedex-detail-extend.component.scss'],
})
export class PokedexDetailExtendComponent implements OnInit, OnChanges {
    @Input() pokemonSelectedId;
    @Output() movesLoadedEvent = new EventEmitter<void>();
    public pokeMovesList = [];
    public displayMoves = false;
    public displayMoveDesc = false;
    private selectedMoveId: string;
    public visibleIndex = -1;
    public arr = [];

    constructor(private pokedexService: PokedexService) {}
    ngOnInit() {
        this.pokedexService
            .getPokemonMoves(this.pokemonSelectedId)
            .subscribe((response: any) => {
                this.pokeMovesList = response;
                this.movesLoaded();
            });
        this.pokedexService
            .getPokemonLearnLevel(this.pokemonSelectedId)
            .subscribe((response: any) => {
                this.arr = response;
            });
    }
    changeDisplayMoves() {
        this.displayMoves = !this.displayMoves;
    }
    ngOnChanges() {}

    prettyString(str) {
        let abc;
        str = str[0].toUpperCase() + str.slice(1);
        abc = str.replace('-', ' ');
        return abc;
    }

    movesLoaded() {
        this.movesLoadedEvent.emit();
    }

    showDescription(index) {
        if (this.visibleIndex === index) {
            this.visibleIndex = -1;
        } else {
            this.visibleIndex = index;
        }
    }
}
