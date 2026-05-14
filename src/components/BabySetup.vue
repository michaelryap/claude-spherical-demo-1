<script setup lang="ts">
// BabySetup.vue — full-screen welcome form shown on first launch.
// Collects the baby's name and date of birth, then emits 'setup-complete'.

import { ref } from 'vue'
import type { BabyProfile } from '../types/milestone'

// This event is emitted once the user submits a valid profile.
const emit = defineEmits<{
  (e: 'setup-complete', profile: BabyProfile): void
}>()

// ─── Form state ───────────────────────────────────────────────────────────────

const name = ref('')
const birthDate = ref('')
const error = ref('')

// Used as the max value for the date picker — can't be born in the future!
const today = new Date().toISOString().split('T')[0]

// ─── Submit ───────────────────────────────────────────────────────────────────

function handleSubmit() {
  error.value = ''

  if (!name.value.trim()) {
    error.value = "Please enter your baby's name."
    return
  }
  if (!birthDate.value) {
    error.value = "Please enter your baby's date of birth."
    return
  }
  if (birthDate.value > today) {
    error.value = 'Birth date cannot be in the future.'
    return
  }

  emit('setup-complete', {
    name: name.value.trim(),
    birthDate: birthDate.value,
  })
}
</script>

<template>
  <!-- Full-page gradient background to create a warm, welcoming first impression -->
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">

      <!-- Hero heading -->
      <div class="text-center mb-8">
        <div class="text-6xl mb-4 animate-bounce">👶</div>
        <h1 class="text-3xl font-bold text-slate-800 mb-2">Welcome!</h1>
        <p class="text-slate-500 text-lg">
          Let's set up your baby's profile to start capturing milestones.
        </p>
      </div>

      <!-- Form card -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-5">

          <!-- Baby's name -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="baby-name">
              Baby's Name <span class="text-rose-400">*</span>
            </label>
            <input
              id="baby-name"
              v-model="name"
              type="text"
              placeholder="e.g. Emma"
              autocomplete="off"
              autofocus
              class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <!-- Date of birth -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="birth-date">
              Date of Birth <span class="text-rose-400">*</span>
            </label>
            <input
              id="birth-date"
              v-model="birthDate"
              type="date"
              :max="today"
              class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          <!-- Inline error message -->
          <p v-if="error" class="text-rose-500 text-sm bg-rose-50 px-4 py-2 rounded-lg">
            {{ error }}
          </p>

          <!-- Submit button -->
          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95 text-lg mt-2"
          >
            Let's Go! 🎉
          </button>

        </form>
      </div>

      <!-- Reassurance note about privacy -->
      <p class="text-center text-slate-400 text-sm mt-6">
        Everything is stored privately in your browser — no account needed.
      </p>

    </div>
  </div>
</template>
