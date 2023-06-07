<template>
  <div class="card relative h-full bg-base-100 shadow-xl xl:card-side">
    <NuxtLink
      :to="beerPageLink"
      class="flex h-48 items-center justify-center p-4 pb-1 xl:h-auto xl:w-1/5 xl:p-6 xl:pr-0"
    >
      <img
        :src="beer.image_url"
        height="200"
        width="200"
        alt="beer"
        class="aspect-[47/183] h-full w-full object-contain xl:w-full"
      />
    </NuxtLink>

    <div class="card-body p-5 xl:w-4/5 xl:p-8">
      <h2 class="card-title">{{ beer.name }}</h2>

      <p class="line-clamp-3 grow-0 2xl:line-clamp-4">{{ beer.description }}</p>
      <div class="flex flex-wrap gap-2">
        <div class="badge-outline badge line-clamp-1">{{ beer.tagline }}</div>
        <div class="badge-outline badge">ABV: {{ beer.abv }}%</div>
        <div class="badge-outline badge">IBU: {{ beer.ibu }}</div>
        <div v-if="isDryHopped" class="badge-secondary badge">Dry Hopped</div>
      </div>
      <div class="card-actions mt-auto justify-end">
        <NuxtLink :to="beerPageLink" class="btn-primary btn mt-2 w-full xl:mt-0 xl:w-1/3">More</NuxtLink>
      </div>
    </div>
    <div
      v-if="containsLactose"
      class="tooltip tooltip-left absolute right-0 top-0 rounded-full bg-warning p-1 sm:tooltip-bottom sm:translate-x-1/2 xl:top-4"
      data-tip="Contains Lactose"
    >
      <CowIcon class="text-2xl text-white" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from '#imports'
import CowIcon from '~icons/mdi/cow'

interface Properties {
  beer: Beer
}

const properties = defineProps<Properties>()

const { beer } = toRefs(properties)

const beerPageLink = `/${beer.value.id}`

const isDryHopped = computed(() => {
  for (const hop of beer.value.ingredients.hops) {
    if (hop.add.toLowerCase().includes('dry hop')) {
      return true
    }
  }

  return false
})

const containsLactose = computed(() => {
  const lactoseString = 'lactose'
  const ingredientsGroups: ['hops', 'malt'] = ['hops', 'malt']

  for (const ingredientGroup of ingredientsGroups) {
    for (const ingredient of beer.value.ingredients[ingredientGroup]) {
      if (ingredient.name.toLowerCase().includes(lactoseString)) {
        return true
      }
    }
  }
})
</script>
