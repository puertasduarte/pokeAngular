import { Pokemon, PokemonDetails } from '../../Utils/interfaces';

import { AfterContentInit, Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { PokedexService } from '../../Services/pokedex.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-pokedex-map',
    templateUrl: './pokedex-map.component.html',
    styleUrls: ['./pokedex-map.component.scss'],
})
export class PokedexMapComponent implements AfterContentInit {
    public pokemonId: number;
    public pokemonSelected: PokemonDetails;
    private map: any;
    private myIcon: any;

    private randomLocation = [
        Math.floor(Math.random() * (3900 - 4300 + 1) + 4300) / 100,
        Math.floor(Math.random() * (-1000 - 400 + 1) + 400) / 100,
    ];

    constructor(
        private pokedexService: PokedexService,
        private route: ActivatedRoute
    ) {}

    ngAfterContentInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.pokemonId = parseInt(params.get('id'), null);
        });
        this.pokedexService
            .getPokemonDetailsByName(this.pokemonId)
            .subscribe(response => {
                this.pokemonSelected = response;
                this.initMap();
            });
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [40.2085, -3.713],
            zoom: 5,
            attributionControl: false,
            maxBounds: L.latLngBounds(L.latLng(-90, -200), L.latLng(90, 200)),
            maxBoundsViscosity: 1.0,
        });
        const tiles = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19,
            }
        );
        tiles.addTo(this.map);
        this.myIcon = L.icon({
            iconUrl: this.pokemonSelected.sprites.front_default,
            iconSize: [52, 52],
        });
        L.marker(this.randomLocation, { icon: this.myIcon }).addTo(this.map);
    }
}
