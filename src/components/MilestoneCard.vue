<script setup lang="ts">
// MilestoneCard.vue — renders a single milestone entry as a card.
// Displays the category badge, date, title, notes, photo, and growth data.

import type { Milestone } from '../types/milestone'
import { CATEGORY_META } from '../types/milestone'
import { formatDate } from '../utils/helpers'

const props = defineProps<{
  milestone: Milestone
}>()

// Look up the colour and icon for this milestone's category
const meta = CATEGORY_META[props.milestone.category]
</script>

<template>
  <!-- Card with a subtle hover shadow to indicate it's a distinct item -->
  <article class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-200">

    <!-- Photo (full-width, shown at the top of the card when present) -->
    <img
      v-if="milestone.photoUrl"
      :src="milestone.photoUrl"
      :alt="milestone.title"
      class="w-full h-52 object-cover"
    />

    <div class="p-5">

      <!-- Top row: category badge on the left, date on the right -->
      <div class="flex items-center justify-between mb-3">
        <span
          :class="[
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
            meta.bgColor,
            meta.textColor
          ]"
        >
          {{ meta.icon }} {{ meta.label }}
        </span>
        <time :datetime="milestone.date" class="text-xs text-slate-400 font-medium">
          {{ formatDate(milestone.date) }}
        </time>
      </div>

      <!-- Milestone title -->
      <h3 class="text-base font-bold text-slate-800 leading-snug mb-1">
        {{ milestone.title }}
      </h3>

      <!-- Optional description / notes -->
      <p v-if="milestone.description" class="text-sm text-slate-500 leading-relaxed">
        {{ milestone.description }}
      </p>

      <!-- Growth measurements — shown only when weight or height was logged -->
      <div
        v-if="milestone.weight !== undefined || milestone.height !== undefined"
        class="flex gap-4 mt-3 pt-3 border-t border-slate-100"
      >
        <div v-if="milestone.weight !== undefined" class="flex items-center gap-1.5">
          <span class="text-base">⚖️</span>
          <span class="text-sm font-semibold text-slate-700">{{ milestone.weight }}</span>
          <span class="text-xs text-slate-400">kg</span>
        </div>
        <div v-if="milestone.height !== undefined" class="flex items-center gap-1.5">
          <span class="text-base">📏</span>
          <span class="text-sm font-semibold text-slate-700">{{ milestone.height }}</span>
          <span class="text-xs text-slate-400">cm</span>
        </div>
      </div>

    </div>
  </article>
</template>
