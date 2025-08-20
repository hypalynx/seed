import { Link } from 'wouter-preact'
import { useState } from 'preact/hooks'

export const Nav = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const current = document.documentElement.getAttribute('data-theme')

    let newValue = current !== 'dark' ? 'dark' : 'light'
    if (current === null) {
      newValue = userPrefersDark ? 'light' : 'dark'
    }

    document.documentElement.setAttribute('data-theme', newValue)
  }

  return (
    <nav class='nav'>
      <div class='max-w-container'>
        <div>[] Stack</div>
        <div>
          <Link href='/counter'>Counter</Link>
          <Link href='/design'>Design</Link>
          <Link href='/'>About</Link>
          <button onClick={toggleTheme} className='btn btn-outline'>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </nav>
  )
}
