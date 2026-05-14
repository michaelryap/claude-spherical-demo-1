<script setup lang="ts">
// App.vue — the root component that owns all app state
// It orchestrates which screen is visible and passes data to child components.

import { ref, computed } from 'vue'
import type { Milestone, BabyProfile } from './types/milestone'
import AppHeader from './components/AppHeader.vue'
import SummaryDashboard from './components/SummaryDashboard.vue'
import MilestoneForm from './components/MilestoneForm.vue'
import MilestoneList from './components/MilestoneList.vue'
import BabySetup from './components/BabySetup.vue'

// ─── App state ────────────────────────────────────────────────────────────────

// The baby's profile. Starts as null; gets filled in after the setup screen.
const baby = ref<BabyProfile | null>(null)

// All milestone entries, stored newest-first so the history shows recent ones at the top.
const milestones = ref<Milestone[]>([])

// Controls whether the "Add Milestone" modal is currently open.
const showForm = ref(false)

// ─── Computed helpers ─────────────────────────────────────────────────────────

// Returns true once the user has completed the baby setup form.
const isSetupComplete = computed(() => baby.value !== null)

// A non-null version of baby for components that only render after setup.
// Safe to use inside the `v-else` block where we know baby is not null.
const currentBaby = computed(() => baby.value as BabyProfile)

// ─── Event handlers ───────────────────────────────────────────────────────────

// Called when the BabySetup form is submitted with valid data.
function onSetupComplete(profile: BabyProfile) {
  baby.value = profile
}

// Called when MilestoneForm emits a completed milestone object.
// We prepend it so the most recent entry always appears at the top.
function onMilestoneAdded(milestone: Milestone) {
  milestones.value.unshift(milestone)
  showForm.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans">

    <!-- ── Setup screen ─────────────────────────────────────────────────────── -->
    <!-- Shown on first launch until the baby profile has been created -->
    <BabySetup
      v-if="!isSetupComplete"
      @setup-complete="onSetupComplete"
    />

    <!-- ── Main app ─────────────────────────────────────────────────────────── -->
    <!-- Shown after setup is complete -->
    <template v-else>

      <!-- Sticky top bar with app branding and baby name/age -->
      <AppHeader :baby="currentBaby" />

      <main class="max-w-3xl mx-auto px-4 py-8 space-y-8">

        <!-- Summary cards row: age, milestones, weight, height -->
        <SummaryDashboard :baby="currentBaby" :milestones="milestones" />

        <!-- Centred "Add Milestone" button -->
        <div class="flex justify-center">
          <button
            @click="showForm = true"
            class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 text-base"
          >
            <span class="text-lg font-bold">＋</span>
            Add Milestone
          </button>
        </div>

        <!-- Scrollable history of all logged milestones -->
        <MilestoneList :milestones="milestones" />

      </main>

      <!-- Add Milestone modal — rendered over the page when showForm is true -->
      <MilestoneForm
        v-if="showForm"
        :baby="currentBaby"
        @close="showForm = false"
        @milestone-added="onMilestoneAdded"
      />

    </template>
  </div>
</template>
