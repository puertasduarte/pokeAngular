import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/Services/pokedex.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    public showLang: boolean = false;
    public aboutUs: string[] = [
        'Jorge Domínguez',
        'Rubén Martín',
        'Jesús Puertas',
        'Eduardo Vela',
    ];
    // modal controler
    public content = {
        header: '',
        body: '',
        footer: '',
        size: [],
    };
    public displayModal = false;

    public selectedLang = '';

    constructor(private pokedexService: PokedexService) {}

    ngOnInit() {
        this.selectedLang = this.pokedexService.language;
    }

    public clickLangButton(): void {
        this.showLang = !this.showLang;
    }

    public changeLang(lang: string): void {
        this.pokedexService.changeLang(lang);
        this.selectedLang = this.pokedexService.language;
        window.location.reload();
    }

    public showModal() {
        this.displayModal = true;
        this.content.size = [32, 60];
        this.content.header = 'Develop team';
        this.content.body = `
            <div>Jorge Domínguez</div>
            <div>Rubén Martín</div>
            <div>Jesús Puertas</div>
            <div>Eduardo Vela</div>
        `;
        this.content.header = `<div> Develop team</div>`;
    }
    public hideModal() {
        this.displayModal = false;
    }
}
