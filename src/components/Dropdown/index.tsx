import { ReactNode, useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import DropdownItem, { DropdownItemProps } from './DropdownItem'
import styles from './Dropdown.module.css'

interface DropdownProps {
  items: DropdownItemProps[],
  position?: 'left' | 'right' | 'top' | 'bottom',
  disabled?: boolean,
  className?: string
  children: ReactNode
}

export default function Dropdown(props: DropdownProps) {
  const {
    items,
    position = 'top',
    disabled = false,
    className,
    children,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const bodyPositionClass = () => {
    switch (position) {
      case 'right':
        return styles.bodyRight
      case 'left':
        return styles.bodyLeft
      case 'bottom':
        return styles.bodyBottom
    }

    // Defaults to the top
    return styles.bodyTop
  }

  const active = () => disabled ? styles.disabled : styles.active

  return (
    <div className={className}>
      <div className={`${styles.dropdown} ${active()}`} onClick={() => !disabled && setIsOpen(!isOpen)}>
        <div className={styles.header}>
          {children}
          {isOpen
            ? <RiArrowUpSLine className={styles.caretIcon} size="1.5rem" />
            : <RiArrowDownSLine className={styles.caretIcon} size="1.5rem" />
          }
        </div>
        <div className={`${styles.body} ${bodyPositionClass()}`}>
          {
            isOpen && !disabled && items?.length > 0
              ? items.map(item => (
                <DropdownItem
                  key={item.display}
                  display={item.display}
                  onClick={item.onClick}
                />
              ))
              : <></>
          }
        </div>
      </div>
    </div>
  )
}
