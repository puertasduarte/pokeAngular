import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PokedexComponent } from './Components/pokedex/pokedex.component';
import { PokedexListComponent } from './Components/pokedex-list/pokedex-list.component';
import { PokedexDetailComponent } from './Components/pokedex-detail/pokedex-detail.component';
import { PokedexMapComponent } from './Components/pokedex-map/pokedex-map.component';
import { NavComponent } from './Components/nav/nav.component';
import { PokedexPokeworldComponent } from './Components/pokedex-pokeworld/pokedex-pokeworld.component';
import { PokedexDetailExtendComponent } from './Components/pokedex-detail-extend/pokedex-detail-extend.component';

import { ModalComponent } from './Components/_shared/modal/modal.component';
import { ModalHeaderComponent } from './Components/_shared/modal-header/modal-header.component';
import { ModalBodyComponent } from './Components/_shared/modal-body/modal-body.component';
import { ModalFooterComponent } from './Components/_shared/modal-footer/modal-footer.component';

import { FilterNamePipe } from './Utils/filter-name.pipe';
import { Pipe, PipeTransform } from '@angular/core';

import { AppRoutingModule } from './Configuration/app-routing.module';
import { LoadingComponent } from './Components/_shared/loading/loading.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TestComponentComponent } from './test-component/test-component.component';
import { PokedexDetailSizeComponent } from './Components/pokedex-detail-size/pokedex-detail-size.component';
import { PokedexTopPokemonComponent } from './Components/pokedex-top-pokemon/pokedex-top-pokemon.component';

@NgModule({
    declarations: [
        AppComponent,
        PokedexComponent,
        PokedexListComponent,
        PokedexDetailComponent,
        PokedexMapComponent,
        FilterNamePipe,
        NavComponent,
        PokedexDetailExtendComponent,
        PokedexPokeworldComponent,
        ModalComponent,
        LoadingComponent,
        TestComponentComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        PokedexDetailSizeComponent,
        PokedexTopPokemonComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(
                        http,
                        '../assets/i18n/',
                        '.json'
                    );
                },
                deps: [HttpClient],
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
