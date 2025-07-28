import { useState } from 'preact/hooks'

export const ToggleSwitch = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  id,
}) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleToggle = () => {
    if (disabled) return
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onChange) onChange(newValue)
  }

  return (
    <div className='toggle-container'>
      {label && (
        <label htmlFor={id} className='toggle-label'>
          {label}
        </label>
      )}
      <button
        id={id}
        type='button'
        className={`toggle-switch ${isChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className='toggle-thumb'></span>
      </button>
    </div>
  )
}
