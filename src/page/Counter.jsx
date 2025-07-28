import { useState } from 'preact/hooks'

export const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div class=''>
      <div class=''>
        <h1 class=''>🔥 Stack App</h1>

        <p class=''>Minimal Preact starter with SSR</p>

        <div class=''>
          <button onClick={() => setCount(count - 1)} class=''>
            -
          </button>

          <span class=''>{count}</span>

          <button onClick={() => setCount(count + 1)} class=''>
            +
          </button>
        </div>

        <p class=''>Click the buttons to test client-side hydration!</p>
      </div>
    </div>
  )
}
