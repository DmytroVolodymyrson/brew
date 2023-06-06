import type { UseFetchOptions } from '#app'

const beersPrefix = 'https://api.punkapi.com/v2/beers'

const getAllBeers = async ( options?: BeerFetchOptions) => {
    return useFetch<Beer[]>(`${beersPrefix}?brewed_after=11-2012`, {
        params:{
            ...options?.params
        },
        ...options
    })
}

const getBeerById = async (id: string, options?: UseFetchOptions<Beer>) => {
    return useFetch<Beer>(`${beersPrefix}/${id}`, options)
}
export const useBeer = () => {
    return {
        getAllBeers,
        getBeerById,
    }
}
