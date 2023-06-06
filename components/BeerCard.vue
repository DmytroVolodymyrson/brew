<template>
  <div class="card card-side h-full bg-base-100 shadow-xl">
    <figure class="w-1/5 p-6">
      <img
        :src="beer.image_url"
        height="200"
        width="200"
        alt="beer"
        class="w-30"
      />
    </figure>
    <div class="card-body relative w-4/5">
      <div
        v-if="containsLactose"
        class="tooltip tooltip-bottom absolute right-4 top-4 rounded-full bg-warning p-1"
        data-tip="Contains Lactose"
      >
        <CowIcon class="text-2xl text-white" />
      </div>

      <h2 class="card-title">{{ beer.name }}</h2>
      <div v-if="isDryHopped" class="badge-secondary badge">Dry Hopped</div>
      <p class="line-clamp-3 grow-0">{{ beer.description }}</p>
      <div class="flex flex-wrap gap-2">
        <div class="badge-outline badge line-clamp-1">{{ beer.tagline }}</div>
        <div class="badge-outline badge">ABV: {{ beer.abv }}%</div>
        <div class="badge-outline badge">IBU: {{ beer.ibu }}</div>
      </div>
      <div class="card-actions mt-auto justify-end">
        <button class="btn-primary btn">More</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "#imports";
import CowIcon from "~icons/mdi/cow";

interface Properties {
  beer: Beer;
}

const properties = defineProps<Properties>();

const { beer } = toRefs(properties);

console.log(beer.value.ingredients.hops);

const isDryHopped = computed(() => {
  for (const hop of beer.value.ingredients.hops) {
    if (hop.add.toLowerCase().includes("dry hop")) {
      return true;
    }
  }
});

const containsLactose = computed(() => {
  const lactoseString = "lactose";
  const ingredientsGroups = ["hops", "malt"];

  for (const ingredientGroup of ingredientsGroups) {
    for (const ingredient of beer.value.ingredients[ingredientGroup]) {
      if (ingredient.name.toLowerCase().includes(lactoseString)) {
        return true;
      }
    }
  }
});
</script>
