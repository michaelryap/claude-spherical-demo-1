<script setup lang="ts">
// AppHeader.vue — the sticky top bar visible throughout the main app.
// Shows the app name on the left and the baby's name + age on the right.

import { computed } from 'vue'
import type { BabyProfile } from '../types/milestone'
import { calculateAge } from '../utils/helpers'

const props = defineProps<{
  baby: BabyProfile
}>()

// Re-compute the age string every time the component re-renders.
// In practice this is fine — it only re-runs when the parent re-renders.
const babyAge = computed(() => calculateAge(props.baby.birthDate))
</script>

<template>
  <!-- Sticky header with a frosted-glass effect using backdrop-blur -->
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-100 shadow-sm">
    <div class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">

      <!-- Left: app icon and name -->
      <div class="flex items-center gap-3">
        <span class="text-2xl">👶</span>
        <div>
          <h1 class="text-base font-bold text-slate-800 leading-tight">Milestone Tracker</h1>
          <p class="text-xs text-slate-400 leading-tight">My Kid's Journey</p>
        </div>
      </div>

      <!-- Right: baby's name and age in a pill badge -->
      <div class="flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-2">
        <span class="text-sm">🌟</span>
        <div class="text-right">
          <p class="text-sm font-semibold text-indigo-700 leading-tight">{{ baby.name }}</p>
          <p class="text-xs text-indigo-400 leading-tight">{{ babyAge }}</p>
        </div>
      </div>

    </div>
  </header>
</template>
