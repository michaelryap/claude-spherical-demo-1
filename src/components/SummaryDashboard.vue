<script setup lang="ts">
// SummaryDashboard.vue — displays four at-a-glance stat cards:
// baby's age, total milestones logged, latest weight, and latest height.

import { computed } from 'vue'
import type { Milestone, BabyProfile } from '../types/milestone'
import { calculateAge } from '../utils/helpers'

const props = defineProps<{
  baby: BabyProfile
  milestones: Milestone[]  // Expected to be sorted newest-first
}>()

// Total number of milestone entries
const totalMilestones = computed(() => props.milestones.length)

// Most recent weight entry — milestones are newest-first, so find() returns the latest
const latestWeight = computed(() => {
  const entry = props.milestones.find(m => m.weight !== undefined)
  return entry?.weight ?? null
})

// Most recent height entry
const latestHeight = computed(() => {
  const entry = props.milestones.find(m => m.height !== undefined)
  return entry?.height ?? null
})

// Baby's current age as a human-readable string
const babyAge = computed(() => calculateAge(props.baby.birthDate))
</script>

<template>
  <!-- Responsive grid: 2 columns on mobile, 4 columns on sm+ screens -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">

    <!-- Age card -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-1">
      <span class="text-2xl">🎂</span>
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Age</p>
      <p class="text-sm font-bold text-slate-800 leading-tight">{{ babyAge }}</p>
    </div>

    <!-- Total milestones card -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-1">
      <span class="text-2xl">⭐</span>
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Milestones</p>
      <p class="text-sm font-bold text-slate-800 leading-tight">
        {{ totalMilestones }}
        <span class="text-xs font-normal text-slate-400">logged</span>
      </p>
    </div>

    <!-- Latest weight card — shows "—" until a growth entry exists -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-1">
      <span class="text-2xl">⚖️</span>
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Weight</p>
      <p class="text-sm font-bold text-slate-800 leading-tight">
        <template v-if="latestWeight !== null">
          {{ latestWeight }}
          <span class="text-xs font-normal text-slate-400">kg</span>
        </template>
        <span v-else class="text-xs font-normal text-slate-400">Not yet logged</span>
      </p>
    </div>

    <!-- Latest height card -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-1">
      <span class="text-2xl">📏</span>
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">Height</p>
      <p class="text-sm font-bold text-slate-800 leading-tight">
        <template v-if="latestHeight !== null">
          {{ latestHeight }}
          <span class="text-xs font-normal text-slate-400">cm</span>
        </template>
        <span v-else class="text-xs font-normal text-slate-400">Not yet logged</span>
      </p>
    </div>

  </div>
</template>
