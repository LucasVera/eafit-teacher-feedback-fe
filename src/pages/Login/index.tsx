import Button, { ButtonColorVariants, ButtonSizeVariants } from '../../components/Button'
import styles from './Login.module.css'
import { FaRegEye } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { ClassContext } from '../../common/context/ClassContext'
import Required from '../../components/Required'
import { useNavigate } from 'react-router-dom'
import InputWithLabel from '../../components/InputWithLabel'

export default function Login() {
  const [validationError, setValidationError] = useState('')
  const [localClassId, setLocalClassId] = useState('')
  const [localTeacherName, setLocalTeacherName] = useState('')

  const navigate = useNavigate()

  const {
    setClassId,
    setTeacherName,
  } = useContext(ClassContext)

  const onClassStart = async () => {
    if (!localClassId) return setValidationError('Class ID is required')
    if (!localTeacherName) return setValidationError('Teacher name is required')

    setValidationError('')

    setClassId(localClassId)
    setTeacherName(localTeacherName)
  }

  const onClassIdChange = (newValue: string) => {
    if (!newValue) return setLocalClassId('')
    const parsedValue = Number(newValue)
    if (isNaN(parsedValue)) return

    setLocalClassId(newValue)
  }

  return (
    <div className={styles.container}>
      <div className={styles.boxContainer}>
        <p className={styles.title}>Welcome to Teacher Feedback</p>
        <p className={styles.text}>A tool that can help you give a better learning experience for your students</p>
        <p className={styles.text}>To continue, please input your <strong><i>Name</i></strong> along your <strong><i>Class ID</i></strong> taken from the screenshot app</p>
        <p></p>

        <InputWithLabel
          label="Name"
          placeholder="Full Name"
          value={localTeacherName}
          onChange={(newValue) => setLocalTeacherName(newValue)}
          required={true}
        />

        <InputWithLabel
          label="Class ID"
          placeholder="Class ID (Numbers only)"
          value={localClassId}
          onChange={(newValue) => onClassIdChange(newValue)}
          required={true}
        />

        {validationError && <p className={styles.validationErrorText}>{validationError}</p>}
        <Button
          className={styles.signInButton}
          colorVariant={ButtonColorVariants.PRIMARY}
          sizeVariant={ButtonSizeVariants.LARGE}
          onClick={() => onClassStart()}
          disabled={localClassId && localTeacherName ? false : true}
        >
          Start class
          <FaRegEye className={styles.btnIcon} size="1.9rem" />
        </Button>
      </div>
    </div>
  )
}
