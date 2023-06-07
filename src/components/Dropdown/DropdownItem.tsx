import styles from './DropdownItem.module.css'

export interface DropdownItemProps {
  display: string
  onClick: () => any
}
export default function DropdownItem(props: DropdownItemProps) {
  const {
    display,
    onClick,
  } = props
  return (
    <div className={styles.container}
      onClick={() => onClick()}
    >
      <p className={styles.item}
      >
        {display}
      </p>
    </div>
  )
}
