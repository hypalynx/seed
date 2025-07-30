import { useState } from 'preact/hooks'
import { ChevronDown } from 'lucide-preact'

export const Accordian = ({ title, expanded = false, children }) => {
  const [isExpanded, setIsExpanded] = useState(expanded)

  const toggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div class='accordian'>
      <div onclick={toggle}>
        <div>{title}</div>
        <ChevronDown
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
      <div
        class='accordian-content'
        style={{
          maxHeight: isExpanded ? 'fit-content' : '0',
        }}
      >
        {children}
      </div>
    </div>
  )
}
