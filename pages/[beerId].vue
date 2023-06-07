<template>
  <div class="mx-auto flex max-w-2xl flex-col gap-4">
    <div class="card shadow-xl">
      <div><img :src="beer.image_url" :alt="beer.name" class="h-64 w-full object-contain" /></div>

      <div class="space-y-4 p-6">
        <div class="flex flex-wrap items-baseline gap-2">
          <h2 class="text-2xl font-bold">{{ beer.name }}</h2>
          <p class="text-sm text-gray-600">{{ beer.tagline }}</p>
        </div>

        <p>{{ beer.description }}</p>

        <div class="flex flex-wrap items-start gap-x-4 gap-y-3">
          <div v-if="beer.first_brewed" class="badge-outline badge gap-1">
            <h5>First Brewed:</h5>
            <span>{{ beer.first_brewed }}</span>
          </div>

          <div v-if="beer.abv" class="badge-outline badge gap-1">
            <h5>ABV:</h5>
            <span>{{ beer.abv }}%</span>
          </div>

          <div v-if="beer.ibu" class="badge-outline badge gap-1">
            <h5>IBU:</h5>
            <span>{{ beer.ibu }}</span>
          </div>

          <div v-if="beer.target_fg" class="badge-outline badge gap-1">
            <h5>Target FG:</h5>
            <span>{{ beer.target_fg }}</span>
          </div>

          <div v-if="beer.target_og" class="badge-outline badge gap-1">
            <h5>Target OG:</h5>
            <span>{{ beer.target_og }}</span>
          </div>

          <div v-if="beer.ebc" class="badge-outline badge gap-1">
            <h5>EBC:</h5>
            <span>{{ beer.ebc }}</span>
          </div>

          <div v-if="beer.srm" class="badge-outline badge gap-1">
            <h5>SRM:</h5>
            <span>{{ beer.srm }}</span>
          </div>

          <div v-if="beer.ph" class="badge-outline badge gap-1">
            <h5>pH:</h5>
            <span>{{ beer.ph }}</span>
          </div>

          <div v-if="beer.attenuation_level" class="badge-outline badge gap-1">
            <h5>Attenuation Level:</h5>
            <span>{{ beer.attenuation_level }}</span>
          </div>

          <div v-if="beer.volume && beer.volume.value && beer.volume.unit" class="badge-outline badge gap-1">
            <h5>Volume:</h5>
            <span>{{ beer.volume.value }} {{ beer.volume.unit }}</span>
          </div>

          <div
            v-if="beer.boil_volume && beer.boil_volume.value && beer.boil_volume.unit"
            class="badge-outline badge gap-1"
          >
            <h5>Boil Volume:</h5>
            <span>{{ beer.boil_volume.value }} {{ beer.boil_volume.unit }}</span>
          </div>
        </div>
      </div>

      <div v-if="beer.method" class="bg-gray-100 p-6">
        <h3 class="mb-2 font-bold">Method</h3>

        <div v-if="beer.method.mash_temp && beer.method.mash_temp.length > 0">
          <h4 class="text-sm font-bold">Mash Temp</h4>
          <ul :class="['grid flex-wrap items-start gap-4 sm:grid-cols-2', mashIsMoreThanOneStep ? 'mt-4' : 'mt-2']">
            <li
              v-for="(mash, index) in beer.method.mash_temp"
              :key="index"
              :class="[
                'relative flex h-full flex-col flex-wrap ',
                {
                  'rounded border bg-white px-4 py-2': mashIsMoreThanOneStep,
                },
              ]"
            >
              <div
                v-if="mashIsMoreThanOneStep"
                class="absolute left-0 top-0 flex aspect-square h-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral p-1 text-xs text-neutral-content"
              >
                {{ index + 1 }}
              </div>
              <p>Temperature: {{ mash.temp.value }} {{ mash.temp.unit }}</p>
              <p v-if="mash.duration">Duration: {{ mash.duration }} minutes</p>
            </li>
          </ul>
        </div>

        <div v-if="beer.method.fermentation && beer.method.fermentation.temp">
          <h4 class="mt-2 text-sm font-bold">Fermentation</h4>
          <p>{{ beer.method.fermentation.temp.value }} {{ beer.method.fermentation.temp.unit }}</p>
        </div>

        <div v-if="beer.method.twist">
          <h4 class="mt-2 text-sm font-bold">Twist</h4>
          <p>{{ beer.method.twist }}</p>
        </div>
      </div>

      <div v-if="beer.ingredients" class="p-6">
        <h3 class="mb-2 font-bold">Ingredients</h3>

        <div v-if="beer.ingredients.malt && beer.ingredients.malt.length > 0">
          <h4 class="text-sm font-bold">Malts</h4>
          <div v-for="(malt, index) in beer.ingredients.malt" :key="index">
            <p v-if="malt.name && malt.amount">{{ malt.name }}: {{ malt.amount.value }} {{ malt.amount.unit }}</p>
          </div>
        </div>

        <div v-if="beer.ingredients.hops && beer.ingredients.hops.length > 0" class="my-5">
          <h2 class="mb-4 text-2xl font-bold">Hops:</h2>
          <div class="grid gap-2 sm:grid-cols-2 sm:gap-4">
            <div
              v-for="(hop, index) in beer.ingredients.hops"
              :key="index"
              class="rounded-md border-2 border-gray-200 p-3"
            >
              <p v-if="hop.name"><span class="font-bold">Name:</span> {{ hop.name }}</p>
              <p v-if="hop.amount">
                <span class="font-bold">Amount:</span> {{ hop.amount.value }} {{ hop.amount.unit }}
              </p>
              <p v-if="hop.add"><span class="font-bold">Add:</span> {{ hop.add }}</p>
              <p v-if="hop.attribute"><span class="font-bold">Attribute:</span> {{ hop.attribute }}</p>
            </div>
          </div>
        </div>

        <div v-if="beer.ingredients.yeast">
          <h4 class="mt-2 text-sm font-bold">Yeast</h4>
          <p>{{ beer.ingredients.yeast }}</p>
        </div>
      </div>

      <div class="bg-gray-100 p-6">
        <h3 class="mb-2 font-bold">Food Pairing</h3>
        <ul>
          <li v-for="(food, index) in beer.food_pairing" :key="index">
            {{ food }}
          </li>
        </ul>
      </div>

      <div v-if="beer.brewers_tips" class="p-6">
        <h3 class="mb-2 font-bold">Brewer's Tips</h3>
        <p>{{ beer.brewers_tips }}</p>
      </div>
    </div>
    <NuxtLink to="/" class="btn-primary btn">Go Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute, ref } from '#imports'
import { useBeer } from '~/composables/beer'

const { getBeerById } = useBeer()
const route = useRoute()

const { data: beerResponse, error } = await getBeerById(route.params.beerId as string)

if (!beerResponse.value || beerResponse.value.length === 0 || error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not found',
  })
}

const beer = ref<Beer>(beerResponse.value[0])

const mashIsMoreThanOneStep = computed(() => beer.value.method.mash_temp.length > 1)

console.log(beer.value)
</script>
