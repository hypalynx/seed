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
    <nav class='nav px-4 h-20 bg-teal-400 font-bold text-lg flex items-center justify-between'>
      <div class='max-w-container'>
        <div>[] Stack</div>
        <div class='gap-4'>
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
