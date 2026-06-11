import { ref, watch } from "vue"

const isDark = ref(false)

function getInitialTheme(): boolean {
  const stored = localStorage.getItem("theme")
  if (stored) return stored === "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark)
}

isDark.value = getInitialTheme()
applyTheme(isDark.value)

watch(isDark, val => {
  applyTheme(val)
  localStorage.setItem("theme", val ? "dark" : "light")
})

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
