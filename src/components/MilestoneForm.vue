<script setup lang="ts">
// MilestoneForm.vue — modal form for logging a new milestone.
// The parent shows/hides this component using v-if.
// It emits 'close' when cancelled and 'milestone-added' when saved.

import { ref, computed } from 'vue'
import type { Milestone, MilestoneCategory, BabyProfile } from '../types/milestone'
import { CATEGORY_META } from '../types/milestone'

const props = defineProps<{
  baby: BabyProfile
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'milestone-added', milestone: Milestone): void
}>()

// ─── Form state ───────────────────────────────────────────────────────────────

// Default the date field to today so the user rarely has to change it
const today = new Date().toISOString().split('T')[0]

const category = ref<MilestoneCategory>('other')
const date = ref(today)
const title = ref('')
const description = ref('')
const weight = ref<number | null>(null)
const height = ref<number | null>(null)
const photoUrl = ref<string | null>(null)   // Base64 data URL after upload
const photoPreview = ref<string | null>(null)

// Validation errors (shown inline beneath each field)
const titleError = ref('')
const dateError = ref('')

// ─── Category selector ────────────────────────────────────────────────────────

// Build an array of { key, meta } pairs so we can iterate in the template
// with proper TypeScript types rather than casting Object.entries results.
const categories = Object.entries(CATEGORY_META).map(([key, meta]) => ({
  key: key as MilestoneCategory,
  meta,
}))

// Auto-fill the title when the user picks 'growth' to save them a step
function onCategoryChange(selected: MilestoneCategory) {
  category.value = selected
  if (selected === 'growth' && !title.value) {
    title.value = 'Growth Check'
  }
}

// True when the selected category is 'growth' — used to show weight/height fields
const isGrowthCategory = computed(() => category.value === 'growth')

// ─── Photo upload ─────────────────────────────────────────────────────────────

// When the user picks a file, we read it into a base64 data URL.
// This stores the image entirely in memory — no server needed.
function handlePhotoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    photoUrl.value = result
    photoPreview.value = result
  }
  reader.readAsDataURL(file)
}

function removePhoto() {
  photoUrl.value = null
  photoPreview.value = null
  // Reset the file input so the same file can be re-selected if needed
  const input = document.getElementById('photo-input') as HTMLInputElement | null
  if (input) input.value = ''
}

// ─── Form submission ─────────────────────────────────────────────────────────

function handleSubmit() {
  // Reset previous errors
  titleError.value = ''
  dateError.value = ''

  // Validate required fields
  if (!title.value.trim()) {
    titleError.value = 'Please enter a title for this milestone.'
    return
  }
  if (!date.value) {
    dateError.value = 'Please select a date.'
    return
  }

  // Assemble the complete Milestone object
  const newMilestone: Milestone = {
    id: Date.now().toString(),           // Simple unique ID using the current timestamp
    date: date.value,
    title: title.value.trim(),
    description: description.value.trim(),
    category: category.value,
    photoUrl: photoUrl.value ?? undefined,
    weight: weight.value ?? undefined,
    height: height.value ?? undefined,
  }

  emit('milestone-added', newMilestone)
}
</script>

<template>
  <!--
    Semi-transparent backdrop.
    Clicking the backdrop (but not the card) closes the modal via @click.self.
  -->
  <div
    class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <!-- Modal card — slides up from the bottom on mobile, centred on desktop -->
    <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

      <!-- Modal header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
        <h2 class="text-xl font-bold text-slate-800">Add a Milestone</h2>
        <button
          @click="emit('close')"
          class="text-slate-400 hover:text-slate-600 transition rounded-full w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-lg"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <!-- Form body -->
      <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-5">

        <!-- ── Category picker ───────────────────────────────────────────── -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Category</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="{ key, meta } in categories"
              :key="key"
              type="button"
              @click="onCategoryChange(key)"
              :class="[
                'flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 text-xs font-semibold transition-all duration-150',
                category === key
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              ]"
            >
              <span class="text-xl">{{ meta.icon }}</span>
              {{ meta.label }}
            </button>
          </div>
        </div>

        <!-- ── Date ─────────────────────────────────────────────────────── -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="milestone-date">
            Date <span class="text-rose-400">*</span>
          </label>
          <input
            id="milestone-date"
            v-model="date"
            type="date"
            :max="today"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
          <p v-if="dateError" class="text-rose-500 text-xs mt-1">{{ dateError }}</p>
        </div>

        <!-- ── Title ─────────────────────────────────────────────────────── -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="milestone-title">
            Title <span class="text-rose-400">*</span>
          </label>
          <input
            id="milestone-title"
            v-model="title"
            type="text"
            placeholder="e.g. First steps!, Said 'Mama', 3-month checkup…"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
          />
          <p v-if="titleError" class="text-rose-500 text-xs mt-1">{{ titleError }}</p>
        </div>

        <!-- ── Notes ─────────────────────────────────────────────────────── -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="milestone-notes">
            Notes
            <span class="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="milestone-notes"
            v-model="description"
            placeholder="Add any extra details or memories…"
            rows="3"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
          />
        </div>

        <!-- ── Weight & Height — only shown for the 'growth' category ──── -->
        <div v-if="isGrowthCategory" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="weight">
              Weight (kg)
            </label>
            <input
              id="weight"
              v-model.number="weight"
              type="number"
              step="0.01"
              min="0"
              max="50"
              placeholder="e.g. 5.2"
              class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5" for="height">
              Height (cm)
            </label>
            <input
              id="height"
              v-model.number="height"
              type="number"
              step="0.1"
              min="0"
              max="200"
              placeholder="e.g. 58.5"
              class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>
        </div>

        <!-- ── Photo upload ───────────────────────────────────────────────── -->
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">
            Photo
            <span class="text-slate-400 font-normal">(optional)</span>
          </label>

          <!-- Photo preview (shown after a file is chosen) -->
          <div v-if="photoPreview" class="relative mb-3 rounded-xl overflow-hidden">
            <img :src="photoPreview" alt="Photo preview" class="w-full h-48 object-cover" />
            <button
              type="button"
              @click="removePhoto"
              class="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-600 rounded-full w-7 h-7 flex items-center justify-center text-sm shadow transition"
              aria-label="Remove photo"
            >
              ✕
            </button>
          </div>

          <!--
            The actual <input type="file"> is hidden.
            The styled <label> below acts as the visible click target.
          -->
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handlePhotoUpload"
          />
          <label
            v-if="!photoPreview"
            for="photo-input"
            class="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-5 text-slate-400 text-sm hover:border-indigo-300 hover:text-indigo-400 transition cursor-pointer"
          >
            <span class="text-2xl">📷</span>
            Choose a photo
          </label>
        </div>

        <!-- ── Action buttons ─────────────────────────────────────────────── -->
        <div class="flex gap-3 pt-2 pb-1">
          <button
            type="button"
            @click="emit('close')"
            class="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
          >
            Save Milestone ✓
          </button>
        </div>

      </form>
    </div>
  </div>
</template>
