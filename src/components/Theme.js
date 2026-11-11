import { createElement, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  const isDark = theme === 'dark'

  return createElement(
    'button',
    {
      onClick: () => setTheme(isDark ? 'light' : 'dark'),
      'aria-label': isDark ? 'Switch to light mode' : 'Switch to dark mode',
      className: 'header-action theme-toggle',
    },
    createElement(isDark ? Sun : Moon, { size: 20 })
  )
}