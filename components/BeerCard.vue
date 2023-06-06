<template>
  <div class="card h-full card-side bg-base-100 shadow-xl">
    <figure class="p-6 w-1/5"><img :src="beer.image_url" height="200" width="200" alt="beer" class="w-30"/></figure>
    <div class="card-body relative w-4/5">
      <div v-if="containsLactose" class="tooltip rounded-full p-1 bg-warning absolute top-4 right-4 tooltip-bottom" data-tip="Contains Lactose">
        <CowIcon class="text-2xl text-white" />
      </div>

      <h2 class="card-title">{{beer.name}}</h2>
      <div v-if="isDryHopped" class="badge badge-secondary">Dry Hopped</div>
      <p class="line-clamp-3 grow-0">{{beer.description}}</p>
      <div class="flex flex-wrap gap-2">
        <div class="badge badge-outline line-clamp-1">{{ beer.tagline }}</div>
        <div class="badge badge-outline">ABV: {{ beer.abv }}%</div>
        <div class="badge badge-outline">IBU: {{ beer.ibu }}</div>
      </div>
      <div class="card-actions justify-end mt-auto">
        <button class="btn btn-primary">More</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import CowIcon from '~icons/mdi/cow'

import {toRefs} from "#imports";

interface Properties {
  beer: Beer
}

const properties = defineProps<Properties>()


const {beer} = toRefs(properties)


console.log(beer.value.ingredients.hops)

const isDryHopped = computed(()=>{
  for (const hop of beer.value.ingredients.hops){
    if (hop.add.toLowerCase().includes('dry hop')){
      return true
    }
  }
})

const containsLactose = computed(()=>{
  const lactoseString = 'lactose'
  const ingredientsGroups =['hops','malt']

  for (const ingredientGroup of ingredientsGroups){
    for (const ingredient of beer.value.ingredients[ingredientGroup]){
      if (ingredient.name.toLowerCase().includes(lactoseString)){
        return true
      }
    }
  }
})


</script>
