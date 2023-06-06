<template>
  <div class="container flex flex-col items-center gap-10 py-20">
    <h1 class="text-5xl">Craft Beer Collection</h1>
    <ul v-if="beersList.length > 0" class="grid grid-cols-3 gap-10">
      <li v-for="beer in beersList" :key="beer.id" class="h-full">
        <BeerCard :beer="beer" />
      </li>
    </ul>

    <div class="alert alert-info justify-start">
      <IconInfo class="text-2xl" />
      <span>No beers found :(</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconInfo from "~icons/mdi/information-outline";

import { useBeer } from "~/composables/beer";

const beersList = ref<Beer[]>([]);

const { getAllBeers } = useBeer();

const { data: beersResponse } = await getAllBeers({
  params: { brewed_after: "11-2012" },
  transform(data) {
    return data.filter((beer) => {
      return !beer.ingredients.hops.find((hop) =>
        hop.name.toLowerCase().includes("centennial")
      );
    });
  },
});

if (beersResponse.value) {
  beersList.value = beersResponse.value;
}

console.log(beersList);
</script>
