export interface Pokemon {
    id: number;
    name: string;
    image: string | null;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: any[];
    description: string;
    sprites: {
        front_default: string | null;
        front_shiny: string | null;
    };
    abilities: object[];
    stats: object[];
}
