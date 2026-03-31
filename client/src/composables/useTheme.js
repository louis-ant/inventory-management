import { ref, computed, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

function applyTheme(val) {
  document.documentElement.classList.toggle('dark', val === 'dark')
}

applyTheme(theme.value)

watch(theme, (val) => {
  localStorage.setItem('theme', val)
  applyTheme(val)
})

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    isDark,
    toggleTheme
  }
}
