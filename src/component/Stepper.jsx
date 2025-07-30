import { useState } from 'preact/hooks'

export const Stepper = ({ initialValue = 0 }) => {
  const [value, setValue] = useState(initialValue)

  const increment = () => {
    setValue(value + 1)
  }

  const decrement = () => {
    setValue(value - 1)
  }

  const handleInputChange = e => {
    const newValue = parseInt(e.target.value) || 0
    setValue(newValue)
  }

  return (
    <div class='stepper'>
      <div onClick={decrement}>-</div>
      <input type='number' value={value} onChange={handleInputChange} />
      <div onClick={increment}>+</div>
    </div>
  )
}
