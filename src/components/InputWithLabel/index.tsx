import Required from '../Required'
import styles from './Input.module.css'

interface InputWithLabelProps {
  label: string
  placeholder: string
  value: string
  onChange: (newValue: string) => void
  required?: boolean,
  disabled?: boolean,
  className?: string,
}

export default function InputWithLabel(props: InputWithLabelProps) {
  const {
    label,
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    className = '',
  } = props
  return (
    <div className={`${className} ${styles.container}`}>
      <label className={styles.label}>{label}{required && <Required />}</label>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />
    </div>
  )
}
