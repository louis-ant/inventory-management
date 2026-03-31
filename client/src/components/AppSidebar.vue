<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="brand" v-show="!isCollapsed">
        <span class="brand-name">{{ t('nav.companyName') }}</span>
      </div>
      <button
        class="collapse-btn"
        @click="toggle"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ flipped: isCollapsed }">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: $route.path === item.path }"
        :title="isCollapsed ? item.label : ''"
      >
        <span class="nav-icon" v-html="item.icon" />
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <LanguageSwitcher v-show="!isCollapsed" />
      <ThemeToggle v-show="!isCollapsed" />
      <ProfileMenu
        @show-profile-details="$emit('show-profile-details')"
        @show-tasks="$emit('show-tasks')"
      />
    </div>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { useI18n } from '../composables/useI18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ProfileMenu from './ProfileMenu.vue'
import ThemeToggle from './ThemeToggle.vue'

const svg = (paths) =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>'

const ICONS = {
  grid:     svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
  box:      svg('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/>'),
  cart:     svg('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'),
  dollar:   svg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
  trend:    svg('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'),
  document: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>')
}

export default {
  name: 'AppSidebar',
  components: { LanguageSwitcher, ProfileMenu, ThemeToggle },
  emits: ['show-profile-details', 'show-tasks'],
  setup() {
    const { isCollapsed, toggle } = useSidebar()
    const { t } = useI18n()

    const navItems = computed(() => [
      { path: '/',          label: t('nav.overview'),       icon: ICONS.grid },
      { path: '/inventory', label: t('nav.inventory'),      icon: ICONS.box },
      { path: '/orders',    label: t('nav.orders'),         icon: ICONS.cart },
      { path: '/spending',  label: t('nav.finance'),        icon: ICONS.dollar },
      { path: '/demand',    label: t('nav.demandForecast'), icon: ICONS.trend },
      { path: '/reports',   label: t('nav.reports'),        icon: ICONS.document }
    ])

    return { isCollapsed, toggle, t, navItems }
  }
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  transition: var(--sidebar-transition);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-shrink: 0;
}
.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  min-height: 60px;
}
.brand-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.025em;
  white-space: nowrap;
}
.collapse-btn {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all 150ms;
}
.collapse-btn:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}
.collapse-btn svg {
  width: 16px;
  height: 16px;
  transition: transform 200ms;
}
.collapse-btn svg.flipped {
  transform: rotate(180deg);
}
.collapsed .sidebar-header {
  justify-content: center;
  padding: var(--space-4) var(--space-2);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-3) 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  margin: 0 var(--space-2);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 120ms, color 120ms;
}
.nav-item:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}
.nav-item.active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}
.nav-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
}
.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
.nav-label {
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 150ms, width 150ms;
}
.collapsed .nav-item {
  justify-content: center;
  padding: var(--space-2);
}
.collapsed .nav-label {
  opacity: 0;
  width: 0;
}

.sidebar-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.collapsed .sidebar-footer {
  padding: var(--space-3) var(--space-2);
  align-items: center;
}
</style>
