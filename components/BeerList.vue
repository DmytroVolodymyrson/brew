<template>
  <ul v-if="beers.length > 0" class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="beer in beers" :key="beer.id" class="h-full">
      <BeerCard :beer="beer" />
    </li>
  </ul>
  <div v-else class="alert alert-info justify-start">
    <IconInfo class="text-2xl" />
    <span>No beers found :(</span>
  </div>
</template>

<script setup lang="ts">
import IconInfo from '~icons/mdi/information-outline'
import { withDefaults } from 'vue'

interface Properties {
  beers: Beer[]
}

withDefaults(defineProps<Properties>(), {
  beers: () => [],
})
</script>
