import { Component, OnInit, Input } from '@angular/core';
import { PokedexService } from 'src/app/Services/pokedex.service';

@Component({
    selector: 'app-pokedex-detail-size',
    templateUrl: './pokedex-detail-size.component.html',
    styleUrls: ['./pokedex-detail-size.component.scss'],
})
export class PokedexDetailSizeComponent implements OnInit {
    @Input() pokemonSelectedId;
    private pokemonImageSrc: string;
    public pokemonHeight: number;
    private trainerHeight = 1.75;

    public displaySize: boolean = false;

    constructor(private pokedexService: PokedexService) {}

    ngOnInit() {
        this.pokedexService
            .getPokemonDetailsByName(this.pokemonSelectedId)
            .subscribe(response => {
                this.pokemonImageSrc = response.sprites.front_default;
                this.pokemonHeight = response.height;
                this.initializeCanvas();
            });
    }

    public changeDisplaySize(): void {
        this.displaySize = !this.displaySize;
    }

    private setSizes(): void {
        const pokemon = document.getElementById('pokemon-img');
        const trainer = document.getElementById('trainer-img');

        if (this.trainerHeight > this.pokemonHeight / 10) {
            trainer.style.height = '14rem';
            pokemon.style.height =
                (((this.pokemonHeight / 10) * 14) / 1.75).toString() + 'rem';
        } else {
            pokemon.style.height = '12rem';
            trainer.style.height =
                ((1.75 * 12) / (this.pokemonHeight / 10)).toString() + 'rem';
        }
    }

    private initializeCanvas(): void {
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = this.pokemonImageSrc;
        const canvas = document.createElement('canvas');
        canvas.id = 'image-canvas';
        const context = canvas.getContext('2d');
        image.onload = () => {
            image.setAttribute('crossOrigin', '');
            context.drawImage(image, 0, 0);
            const trimmedCanvas = this.trimImage(canvas);
            trimmedCanvas.style.height = '5rem';
            trimmedCanvas.style.filter = 'brightness(0%)';
            trimmedCanvas.id = 'pokemon-img';
            const parent = document.getElementById('pokemon-canvas-container');
            parent.appendChild(trimmedCanvas);
            this.setSizes();
        };
    }

    private trimImage(canvas: HTMLCanvasElement): HTMLCanvasElement {
        const ctx = canvas.getContext('2d');
        const copy = document.createElement('canvas').getContext('2d');
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const l = pixels.data.length;
        let i;
        const bound = {
            top: null,
            left: null,
            right: null,
            bottom: null,
        };
        let x;
        let y;

        // Iterate over every pixel to find the highest
        // and where it ends on every axis ()
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                x = (i / 4) % canvas.width;
                /* tslint:disable:no-bitwise */
                y = ~~(i / 4 / canvas.width);
                /* tslint:enable:no-bitwise */

                if (bound.top === null) {
                    bound.top = y;
                }

                if (bound.left === null) {
                    bound.left = x;
                } else if (x < bound.left) {
                    bound.left = x;
                }

                if (bound.right === null) {
                    bound.right = x;
                } else if (bound.right < x) {
                    bound.right = x;
                }

                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }

        // Calculate the height and width of the content
        const trimHeight = bound.bottom - bound.top;
        const trimWidth = bound.right - bound.left;
        const trimmed = ctx.getImageData(
            bound.left,
            bound.top,
            trimWidth,
            trimHeight
        );

        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.putImageData(trimmed, 0, 0);

        // Return trimmed canvas
        return copy.canvas;
    }
}
