// milestone.ts — all TypeScript types and display metadata for the app

// ─── Category ─────────────────────────────────────────────────────────────────

/**
 * The six categories a milestone can belong to.
 * Used for colour coding and filtering.
 */
export type MilestoneCategory =
  | 'growth'     // Height and weight measurements
  | 'motor'      // Physical movement (crawling, walking, rolling)
  | 'language'   // Speech and communication (first words, babbling)
  | 'social'     // Interactions and emotions (first smile, recognising faces)
  | 'cognitive'  // Learning and problem-solving (object permanence, cause & effect)
  | 'other'      // Special moments that don't fit the other categories

// ─── Core data types ──────────────────────────────────────────────────────────

/** A single milestone entry logged by the parent. */
export interface Milestone {
  id: string              // Unique ID — generated from Date.now() at creation time
  date: string            // Date the milestone happened (YYYY-MM-DD)
  title: string           // Short, memorable title e.g. "First steps! 🎉"
  description: string     // Optional longer note; empty string if not provided
  category: MilestoneCategory
  photoUrl?: string       // Base64 data URL of the uploaded photo (if any)
  weight?: number         // Baby's weight in kg (used with 'growth' category)
  height?: number         // Baby's height in cm (used with 'growth' category)
}

/** The baby's basic profile, entered once on first launch. */
export interface BabyProfile {
  name: string       // Baby's first name
  birthDate: string  // Date of birth (YYYY-MM-DD)
}

// ─── UI display metadata ──────────────────────────────────────────────────────

/** Visual display settings for each category (shown on cards and the form). */
export interface CategoryMeta {
  label: string     // Human-readable name
  icon: string      // Emoji icon
  bgColor: string   // Tailwind background colour class
  textColor: string // Tailwind text colour class
}

/**
 * A lookup table mapping each category to its display metadata.
 * Import this wherever you need to render a category badge or selector.
 */
export const CATEGORY_META: Record<MilestoneCategory, CategoryMeta> = {
  growth: {
    label: 'Growth',
    icon: '📏',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  motor: {
    label: 'Motor Skills',
    icon: '🏃',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  language: {
    label: 'Language',
    icon: '💬',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  social: {
    label: 'Social',
    icon: '👶',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
  },
  cognitive: {
    label: 'Cognitive',
    icon: '🧠',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  other: {
    label: 'Other',
    icon: '⭐',
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-600',
  },
}
