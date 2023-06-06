import {UseFetchOptions} from "#app";

interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: Volume;
    boil_volume: Volume;
    method: Method;
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}

interface Volume {
    value: number;
    unit: string;
}

interface Temp {
    value: number;
    unit: string;
}

interface MashTemp {
    temp: Temp;
    duration: number;
}

interface Fermentation {
    temp: Temp;
}

interface Method {
    mash_temp: MashTemp[];
    fermentation: Fermentation;
    twist: string;
}

interface Amount {
    value: number;
    unit: string;
}

interface Malt {
    name: string;
    amount: Amount;
}

interface Hop {
    name: string;
    amount: Amount;
    add: string;
    attribute: string;
}

interface Ingredients {
    malt: Malt[];
    hops: Hop[];
    yeast: string;
}

interface BeerApiParams {
    abv_gt?: number;
    abv_lt?: number;
    ibu_gt?: number;
    ibu_lt?: number;
    ebc_gt?: number;
    ebc_lt?: number;
    beer_name?: string;
    yeast?: string;
    brewed_before?: string; // this should be in the format: mm-yyyy
    brewed_after?: string;  // this should be in the format: mm-yyyy
    hops?: string;
    malt?: string;
    food?: string;
    ids?: string;  // This should be a string of IDs separated by "|"
    page?: number;
    per_page?: number;
}


interface BeerFetchOptions extends Omit<UseFetchOptions<Beer[]>, 'params'> {
    params?: SearchParams | BeerApiParams
}
