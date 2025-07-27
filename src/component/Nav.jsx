import { h } from 'preact';
import { Link } from 'wouter-preact';

export const Nav = () => {
  return (
    <nav class="nav px-4 h-20 bg-teal-400 font-bold text-lg flex items-center justify-between">
      <div class="max-w-container">
        <div>[] Seed</div>
        <div class="gap-4">
          <Link href="/counter">Counter</Link>
          <Link href="/design">Design</Link>
          <Link href="/">About</Link>
          <Link href="/">Moon</Link>
        </div>
      </div>
    </nav>
  )
}
