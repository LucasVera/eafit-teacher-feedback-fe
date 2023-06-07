import styles from './Spinner.module.css'

interface SpinnerProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large'
  className?: string
}
export default function Spinner(props: SpinnerProps) {
  const {
    size = 'medium',
    className = ''
  } = props

  const sizeClass = () => {
    switch (size) {
      case 'xsmall':
        return styles.spinnerXs
      case 'small':
        return styles.spinnerSm
      case 'large':
        return styles.spinnerLg
    }

    // defaults to medium
    return styles.spinnerMd
  }

  return (
    <div className={`${styles.spinner} ${sizeClass()} ${className}`}></div>
  )
}
