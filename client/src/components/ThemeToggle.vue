<template>
  <button
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <span class="toggle-label">{{ isDark ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<script>
import { useTheme } from '../composables/useTheme'

export default {
  name: 'ThemeToggle',
  setup() {
    const { isDark, toggleTheme } = useTheme()
    return { isDark, toggleTheme }
  }
}
</script>

<style scoped>
.theme-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms;
}

.theme-toggle:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.toggle-label {
  white-space: nowrap;
}
</style>
