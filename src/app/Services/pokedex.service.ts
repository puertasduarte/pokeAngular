import { Pokemon, PokemonDetails } from '../Utils/interfaces';

import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of, throwError, pipe, forkJoin } from 'rxjs';
import {
    mergeMap,
    switchMap,
    retry,
    map,
    catchError,
    filter,
    scan,
    tap,
    windowWhen,
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class PokedexService {
    public pokemonList: any[] = [];
    private data: Observable<any> = undefined;

    public topPokemonList: any[] = [];

    public language = '';
    private defaultLang = 'en';

    constructor(
        private https: HttpClient,
        private translate: TranslateService
    ) {
        this.initLanguage();
        if (!window.localStorage.getItem('pokemonFullList')) {
            window.localStorage.setItem(
                'pokemonFullList',
                JSON.stringify(this.pokemonList)
            );
        }
    }

    private initLanguage(): void {
        const storageName = 'language';
        if (window.localStorage[storageName] !== undefined) {
            this.language = window.localStorage[storageName];
        } else {
            this.language = this.defaultLang;
            window.localStorage[storageName] = this.defaultLang;
        }
        this.changeLang(this.language);
        this.translate.setDefaultLang(this.language);
    }

    public changeLang(lang: string): void {
        this.language = lang;
        const storageName = 'language';
        window.localStorage[storageName] = this.language;
        this.translate.use(lang);
    }

    private getPokemonListData() {
        if (this.data === undefined) {
            const url = 'https://pokeapi.co/api/v2/pokemon/?limit=811';
            this.data = this.https.get(url);
            return this.data;
        } else {
            return this.data;
        }
    }

    public getPokemonList(): Observable<any> {
        const data = this.getPokemonListData();
        return data.pipe(
            map((res: any) => {
                return res.results.reduce((result, element, index) => {
                    if (element) {
                        const newPokemon: Pokemon = {
                            name: element.name,
                            id: index + 1,
                            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
                                1}.png`,
                        };
                        result.push(newPokemon);
                    }
                    return result;
                }, []);
            })
        );
    }
    public getPokemonByType(type: string): Observable<any> {
        if (type !== 'all') {
            const url = 'https://pokeapi.co/api/v2/type/' + type + '/';
            const data = this.https.get(url);
            return data.pipe(
                map((res: any) => {
                    return res.pokemon.map((result, index) => ({
                        name: result.pokemon.name,
                        id: result.pokemon.url.match(/\/([^\/]+)\/?$/)[1],
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            result.pokemon.url.match(/\/([^\/]+)\/?$/)[1]
                        }.png`,
                    }));
                })
            );
        } else {
            return this.getPokemonList();
        }
    }
    /*
        id parameter can be the name or the id number of pokemon
     */
    public getPokemonDetailsByName(id: string | number): Observable<any> {
        const pokemon: PokemonDetails = {
            id: 0,
            name: '',
            height: 0,
            weight: 0,
            types: [],
            description: '',
            sprites: {
                front_default: '',
                front_shiny: '',
            },
            abilities: [],
            stats: [],
        };
        const url = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';
        const obs = new Observable(observer => {
            this.https.get(url).subscribe((x: any) => {
                pokemon.id = x.id;
                pokemon.name = x.name;
                pokemon.height = x.height;
                pokemon.weight = x.weight;
                pokemon.types = x.types;
                pokemon.sprites = x.sprites;
                pokemon.abilities = [];
                for (const elem of x.abilities) {
                    const obj = { name: '', isHidden: '' };
                    obj.isHidden = elem.is_hidden;
                    this.https
                        .get(elem.ability.url)
                        .subscribe((abilityLanguage: any) => {
                            for (const abilityChooseLanguage of abilityLanguage.names) {
                                if (
                                    abilityChooseLanguage.language.name ===
                                    this.language
                                ) {
                                    obj.name = abilityChooseLanguage.name;
                                    pokemon.abilities.push(obj);
                                    break;
                                }
                            }
                        });
                }
                pokemon.stats = [];
                for (const elem of x.stats) {
                    const obj = { name: '', baseStat: '', effort: '' };
                    obj.baseStat = elem.base_stat;
                    obj.effort = elem.effort;
                    obj.name = elem.stat.name;
                    pokemon.stats.push(obj);
                }
                this.https.get(x.species.url).subscribe((y: any) => {
                    for (const language of y.flavor_text_entries) {
                        if (language.language.name === this.language) {
                            pokemon.description = language.flavor_text;
                            break;
                        }
                    }
                    // for (const elem of y.names) {
                    //     if (elem.language.name === this.language) {
                    //         pokemon.name = elem.name;
                    //         break;
                    //     }
                    // }
                    observer.next(pokemon);
                });
            });
        });
        return obs;
    }
    public getPokemonEvolutionChain(id: string | number): Observable<any> {
        const url = 'https://pokeapi.co/api/v2/pokemon-species/' + id + '/';
        const obs = new Observable(observer => {
            this.https
                .get(url)
                .pipe(
                    catchError(err => {
                        observer.next([]);
                        return throwError(err);
                    })
                )
                .subscribe((x: any) => {
                    this.https
                        .get(x.evolution_chain.url)
                        .subscribe((response: any) => {
                            let chain = [];
                            chain.push(response.chain.species.name);
                            function iterateEvolutions(
                                obj,
                                evChain
                            ): Array<object> {
                                if (obj.evolves_to.length === 0) {
                                    return evChain;
                                } else {
                                    obj.evolves_to.forEach(evolution =>
                                        chain.push(evolution.species.name)
                                    );
                                    obj = obj.evolves_to[0];
                                    return iterateEvolutions(obj, evChain);
                                }
                            }
                            chain = iterateEvolutions(response.chain, chain);
                            const chainResult: object[] = [];
                            const observablesArr = [];
                            for (const pokemon of chain) {
                                observablesArr.push(
                                    this.https.get(
                                        'https://pokeapi.co/api/v2/pokemon/' +
                                            pokemon +
                                            '/'
                                    )
                                );
                            }
                            forkJoin(observablesArr).subscribe(
                                (result: any) => {
                                    for (const [
                                        i,
                                        observable,
                                    ] of result.entries()) {
                                        const details: any = {};
                                        details.id = observable.id;
                                        details.name = observable.name;
                                        details.image =
                                            observable.sprites.front_default;
                                        details.image_shiny =
                                            observable.sprites.front_shiny;
                                        chainResult[i] = details;
                                    }
                                    observer.next(chainResult);
                                }
                            );
                        });
                });
        });
        return obs;
    }
    public getTopTenPokemon(): Observable<any> {
        const storageName = 'topPokemonList';
        if (window.localStorage[storageName] !== undefined) {
            this.topPokemonList = JSON.parse(window.localStorage[storageName]);
            return new Observable(observer => {
                observer.next(this.topPokemonList);
            });
        } else {
            return new Observable(observer => {
                this.initTopTenPokemon().subscribe((result: any) => {
                    this.topPokemonList = result;
                    localStorage.clear();
                    window.localStorage[storageName] = JSON.stringify(
                        this.topPokemonList
                    );
                    observer.next(this.topPokemonList);
                });
            });
        }
    }
    public initTopTenPokemon(): Observable<any> {
        let topHp: any[] = [];
        let topAttack: any[] = [];
        let topDefense: any[] = [];
        let topSAttack: any[] = [];
        let topSDefense: any[] = [];
        let topSpeed: any[] = [];
        let topAverage: any[] = [];
        const data = this.getPokemonListData();
        const obs = new Observable(observer => {
            data.subscribe((x: any) => {
                const obsArr: Observable<any>[] = [];
                x.results.forEach(pokemon => {
                    obsArr.push(this.https.get(pokemon.url));
                });
                forkJoin(obsArr).subscribe((result: any) => {
                    const resultArr: any[] = [];
                    for (const [i, pokemon] of result.entries()) {
                        resultArr.push(pokemon);
                    }
                    function getTopTen(arr, statIndex) {
                        let myArr = arr;
                        let myResultArr = [];
                        myArr = arr
                            .sort(
                                (a, b) =>
                                    b.stats[statIndex].base_stat -
                                    a.stats[statIndex].base_stat
                            )
                            .filter(y => y.sprites.front_default !== null)
                            .slice(0, 10);
                        myResultArr = parseArr(myArr, statIndex);
                        return myResultArr;
                    }
                    function parseArr(arr, statIndex) {
                        const myResultArr = [];
                        for (const pokemon of arr) {
                            const obj: any = {};
                            obj.id = pokemon.id;
                            obj.name = pokemon.name;
                            obj.image = pokemon.sprites.front_default;
                            const statArr: any = [];
                            for (const elem of pokemon.stats) {
                                statArr.push({
                                    name: elem.stat.name,
                                    baseStat: elem.base_stat,
                                    effort: elem.effort,
                                });
                            }
                            obj.stats = statArr;
                            myResultArr.push(obj);
                        }
                        return myResultArr;
                    }
                    function getAverage(obj) {
                        return (
                            (obj.stats[0].base_stat +
                                obj.stats[1].base_stat +
                                obj.stats[2].base_stat +
                                obj.stats[3].base_stat +
                                obj.stats[4].base_stat +
                                obj.stats[5].base_stat) /
                            6
                        );
                    }
                    topHp = getTopTen(resultArr, 5);
                    topAttack = getTopTen(resultArr, 4);
                    topDefense = getTopTen(resultArr, 3);
                    topSAttack = getTopTen(resultArr, 2);
                    topSDefense = getTopTen(resultArr, 1);
                    topSpeed = getTopTen(resultArr, 0);
                    topAverage = resultArr
                        .sort((a, b) => getAverage(b) - getAverage(a))
                        .slice(0, 10);
                    topAverage = parseArr(topAverage, null);
                    observer.next([
                        topSpeed,
                        topSDefense,
                        topSAttack,
                        topDefense,
                        topAttack,
                        topHp,
                        topAverage,
                    ]);
                });
            });
        });
        return obs;
    }
    public getPokemonMoves(id: string | number): Observable<any> {
        const pokemonMovesResult: object[] = [];
        const url = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';
        const obs = new Observable(observer => {
            this.https.get(url).subscribe((x: any) => {
                const observablesArr = [];
                let details: any = {};
                for (const moves of x.moves) {
                    observablesArr.push(this.https.get(moves.move.url));
                }
                forkJoin(observablesArr).subscribe((result: any) => {
                    for (const [i, observable] of result.entries()) {
                        for (const n of observable.names) {
                            if (n.language.name === this.language) {
                                details.name = n.name;
                            }
                        }
                        details.power = observable.power;
                        details.accuracy = observable.accuracy;
                        details.pp = observable.pp;
                        for (const d of observable.flavor_text_entries) {
                            if (d.language.name === this.language) {
                                details.description = d.flavor_text;
                            }
                        }
                        details.type1 = observable.type.name;
                        details.type2 = observable.damage_class.name;
                        details.drain = observable.meta.drain;
                        pokemonMovesResult[i] = details;
                        details = {};
                    }
                    observer.next(pokemonMovesResult);
                });
            });
        });
        return obs;
    }
    public getPokemonLearnLevel(id: string | number): Observable<any> {
        const movesLearnMethod: object[] = [];
        const url = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';
        const obs = new Observable(observer => {
            this.https.get(url).subscribe((data: any) => {
                const observablesArr = [];
                const levelArr = [];
                let details: any = {};
                for (const moves of data.moves) {
                    observablesArr.push(
                        this.https.get(
                            moves.version_group_details[0].move_learn_method.url
                        )
                    );
                    levelArr.push(
                        moves.version_group_details[0].level_learned_at
                    );
                }
                forkJoin(observablesArr).subscribe((result: any) => {
                    for (const [i, observable] of result.entries()) {
                        for (const n of observable.names) {
                            if (n.language.name === this.language) {
                                details.name = n.name;
                            }
                        }
                        if (this.language === 'ja') {
                            details.name = observable.name;
                        }
                        details.method = observable.descriptions[0].description;
                        details.level = levelArr[i];
                        movesLearnMethod.push(details);
                        details = {};
                    }
                });
                observer.next(movesLearnMethod);
            });
        });
        return obs;
    }
}
