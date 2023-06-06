<template>
  <div class="container flex flex-col gap-10 py-20 items-center">

    <h1 class="text-5xl">Craft Beer Collection</h1>
    <ul class="grid grid-cols-3 gap-10" v-if="beersList.length > 0">
      <li v-for="beer in beersList" class="h-full" :key="beer.id">
        <BeerCard  :beer="beer"/>
      </li>
    </ul>
    <div v-else class="alert alert-info justify-start">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>No beers found :(</span>
    </div>
  </div>


</template>


<script setup lang="ts">
import {useBeer} from "../composables/beer";
const beersList = ref<Beer[]>([])

const {getAllBeers} = useBeer()

const {data:beersResponse} = await getAllBeers({transform:(data)=>{
    return data.filter((beer)=>{

      return !beer.ingredients.hops.find(hop=>hop.name.toLowerCase().includes('centennial'))

    })
  }})



if (beersResponse.value){
  beersList.value = beersResponse.value
}

console.log(beersList);
</script>
