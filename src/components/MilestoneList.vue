<script setup lang="ts">
// MilestoneList.vue — renders all MilestoneCards with a friendly empty state.
// Milestones are expected to arrive newest-first (sorted by the parent).

import type { Milestone } from '../types/milestone'
import MilestoneCard from './MilestoneCard.vue'

defineProps<{
  milestones: Milestone[]
}>()
</script>

<template>
  <section>

    <!-- Section heading with a live entry count -->
    <h2 class="text-base font-bold text-slate-700 mb-4">
      Milestone History
      <span v-if="milestones.length" class="ml-2 text-sm font-normal text-slate-400">
        {{ milestones.length }} {{ milestones.length === 1 ? 'entry' : 'entries' }}
      </span>
    </h2>

    <!-- Empty state — shown before the first milestone is added -->
    <div
      v-if="milestones.length === 0"
      class="text-center py-16 px-4"
    >
      <div class="text-5xl mb-4">📖</div>
      <p class="text-lg font-semibold text-slate-500 mb-1">No milestones yet</p>
      <p class="text-sm text-slate-400">
        Tap <span class="font-medium text-indigo-500">Add Milestone</span> above to record your first memory!
      </p>
    </div>

    <!--
      Card grid:
      - 1 column on mobile (easy to read on small screens)
      - 2 columns on sm+ (makes better use of wider screens)
    -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
      <MilestoneCard
        v-for="milestone in milestones"
        :key="milestone.id"
        :milestone="milestone"
      />
    </div>

  </section>
</template>
