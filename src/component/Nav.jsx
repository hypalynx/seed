import { Link } from 'wouter-preact'
import { useState } from 'preact/hooks'

export const Nav = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
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
