<template>
  <div class="container flex flex-col items-center gap-10">
    <h1 class="text-center text-4xl font-bold sm:text-5xl">Craft Beer Collection</h1>
    <div ref="beersListReference">
      <BeerList :beers="beersList" />
      {{ beersPending }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/shared'
import { useBeer } from '~/composables/beer'

const beersList = ref<Beer[]>([])
const beersListReference = ref()
const currentPage = ref(1)
const itemsPerPage = ref(20)
const nextPageAvailableToLoad = ref(true)

const { getAllBeers } = useBeer()

const beerRequestParameters = computed<BeerApiParameters>(() => {
  return {
    brewed_after: '11-2012',
    per_page: itemsPerPage.value,
    page: currentPage.value,
  }
})

const {
  data: beersResponse,
  pending: beersPending,
  error: beersFetchError,
} = await getAllBeers({
  params: beerRequestParameters,
  transform(data) {
    return data.sort(sortBeersByABV)
  },
})

if (beersResponse.value && beersResponse.value.length > 0 && !beersFetchError.value) {
  beersList.value = beersResponse.value.filter((beer) => filterBeersWithCentennialHops(beer))
}

watch(beersResponse, async () => {
  if (beersResponse.value && beersResponse.value.length > 0 && !beersFetchError.value) {
    beersList.value.push(...beersResponse.value.filter((beer) => filterBeersWithCentennialHops(beer)))

    if (beersResponse.value.length < itemsPerPage.value) {
      nextPageAvailableToLoad.value = false
    }
  }
})

function sortBeersByABV(beerA: Beer, beerB: Beer) {
  return beerA.abv - beerB.abv
}

function filterBeersWithCentennialHops(beer: Beer) {
  return !beer.ingredients.hops.some((hop) => hop.name.toLowerCase().includes('centennial'))
}

function handleScroll() {
  if (beersListReference.value.getBoundingClientRect().bottom < window.innerHeight) {
    if (!nextPageAvailableToLoad.value) {
      return
    }

    currentPage.value += 1
  }
}

const debouncedHandleScroll = useDebounceFn(handleScroll, 500)

onMounted(() => {
  window.addEventListener('scroll', debouncedHandleScroll)
})
</script>
