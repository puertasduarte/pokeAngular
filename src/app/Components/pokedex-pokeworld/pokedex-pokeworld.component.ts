import { Pokemon } from '../../Utils/interfaces';
import * as L from 'leaflet';
import { Router } from '@angular/router';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokedexService } from 'src/app/Services/pokedex.service';
import { PokedexMapComponent } from '../pokedex-map/pokedex-map.component';

@Component({
    selector: 'app-pokedex-pokeworld',
    templateUrl: './pokedex-pokeworld.component.html',
    styleUrls: ['./pokedex-pokeworld.component.scss'],
})
export class PokedexPokeworldComponent implements OnInit {
    @Output() choosePokemonEvent = new EventEmitter<object>();
    @Output() chooseTypeEvent = new EventEmitter<object>();

    public selectType: any;
    public term: any;

    private fullPokemonList: Pokemon[];
    private currentPokemonList: Pokemon[];

    private map: any;
    private markers: any;

    public isLoaded: boolean = false;

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
        'ice',
        'dark',
        'fairy',
    ];

    constructor(
        private router: Router,
        private pokedexService: PokedexService
    ) {}

    ngOnInit() {
        this.checkIfLoaded();
        this.pokedexService.getPokemonList().subscribe((response: any) => {
            this.currentPokemonList = response;
            this.fullPokemonList = response;
            this.initMap(this.currentPokemonList);
        });
    }

    private checkIfLoaded(): void {
        if (
            this.currentPokemonList !== undefined &&
            this.fullPokemonList !== undefined
        ) {
            setTimeout(() => {
                this.isLoaded = true;
            }, 10);
            return;
        } else {
            setTimeout(() => {
                this.checkIfLoaded();
            }, 10);
        }
    }

    public onChange(type: string): void {
        this.chooseType(type);
    }

    private chooseType(type): void {
        if (type !== '') {
            this.pokedexService.getPokemonByType(type).subscribe(response => {
                this.currentPokemonList = response;
                this.addIcons(this.currentPokemonList);
            });
        }
    }

    public changeInput(input): void {
        this.markers.eachLayer(marker => {
            if (marker.options.pokemonName.toLowerCase().includes(input)) {
                marker.getElement().style.visibility = 'visible';
            } else {
                marker.getElement().style.visibility = 'hidden';
            }
        });
    }

    private addLinks(): void {
        this.markers.eachLayer(marker => {
            marker.on('click', e => {
                this.router.navigateByUrl('detail/' + marker.options.pokemonId);
            });
        });
    }

    private initMap(pokemonArray): void {
        this.map = L.map('map', {
            center: [40.2085, -3.713],
            zoom: 2,
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
        this.markers = L.layerGroup().addTo(this.map);
        this.addIcons(pokemonArray);
        this.addLinks();
    }

    private addIcon(pokemon: Pokemon): void {
        const randomLocation = [
            Math.floor(Math.random() * (-8000 - 8000 + 1) + 8000) / 100,
            Math.floor(Math.random() * (-16000 - 16000 + 1) + 16000) / 100,
        ];
        const newIcon = L.icon({
            iconUrl: pokemon.image,
            iconSize: [52, 52],
        });
        const marker = L.marker(randomLocation, {
            icon: newIcon,
            pokemonName: pokemon.name,
            pokemonId: pokemon.id,
        })
            .bindPopup(
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            )
            .addTo(this.markers);
        marker.on('mouseover', function(e) {
            this.openPopup();
        });
        marker.on('mouseout', function(e) {
            this.closePopup();
        });
        this.markers.addLayer(marker);
    }

    private addIcons(pokemonArray): void {
        this.markers.clearLayers();
        pokemonArray.forEach(pokemon => {
            this.addIcon(pokemon);
        });
    }
}
