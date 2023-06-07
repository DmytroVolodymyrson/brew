import type { UseFetchOptions } from '#app'

const beersPrefix = 'https://api.punkapi.com/v2/beers'

const getAllBeers = async (options?: UseFetchOptions<Beer[]>) => {
  return useFetch<Beer[]>(beersPrefix, options)
}

const getBeerById = async (id: string, options?: UseFetchOptions<Beer[]>) => {
  return useFetch<Beer[]>(`${beersPrefix}/${id}`, options)
}

export const useBeer = () => {
  return {
    getAllBeers,
    getBeerById,
  }
}
