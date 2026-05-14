// helpers.ts — shared utility functions used by multiple components

/**
 * Converts a YYYY-MM-DD birth date into a friendly, human-readable age string.
 *
 * Examples:
 *   0 days  → "Newborn"
 *   5 days  → "5 days old"
 *   3 months → "3 months old"
 *   2 years  → "2 years old"
 *   2y 4m   → "2y 4m old"
 */
export function calculateAge(birthDate: string): string {
  // Parse the birth date as a local midnight time to avoid timezone shifts
  const birth = new Date(birthDate + 'T00:00:00')
  const now = new Date()

  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

  if (totalDays < 1) return 'Newborn'
  if (totalDays < 30) return `${totalDays} day${totalDays !== 1 ? 's' : ''} old`

  // 30.44 = average days per month across a year
  const months = Math.floor(totalDays / 30.44)
  if (months < 24) return `${months} month${months !== 1 ? 's' : ''} old`

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''} old`
  return `${years}y ${remainingMonths}m old`
}

/**
 * Formats a YYYY-MM-DD date string for display in the UI.
 *
 * Example: "2024-04-15" → "April 15, 2024"
 *
 * We append T12:00:00 (noon) before parsing to prevent the date
 * from shifting to the previous day due to UTC vs local timezone offsets.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
