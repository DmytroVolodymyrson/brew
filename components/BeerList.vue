<template></template>

<script setup lang="ts">
import { withDefaults } from "vue";

interface Properties {
  beers: Beer[];
}

withDefaults(defineProps<Properties>(), {
  beers: () => [],
});
</script>
