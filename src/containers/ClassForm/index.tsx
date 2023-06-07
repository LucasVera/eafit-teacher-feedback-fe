import { useState } from 'react'
import { FaGraduationCap, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { StudentEducationLevel } from '../../common/types/Students'
import Button, { ButtonColorVariants, ButtonSizeVariants } from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import InputWithLabel from '../../components/InputWithLabel'
import Required from '../../components/Required'
import styles from './ClassForm.module.css'

interface ClassFormProps {
  onClassStart: (classId: string, teacherName: string, classMainTopic: string, studentsEducationLevel: StudentEducationLevel, classSubTopic?: string) => void,
  onClassStop: () => void,
  isClassStarted: boolean,
  className?: string,
}

export default function ClassForm(props: ClassFormProps) {
  const {
    onClassStart,
    onClassStop,
    isClassStarted,
    className = '',
  } = props

  const [validationError, setValidationError] = useState('')
  const [localClassId, setLocalClassId] = useState('')
  const [localTeacherName, setLocalTeacherName] = useState('')
  const [localClassMainTopic, setLocalClassMainTopic] = useState('')
  const [localClassSubTopic, setLocalClassSubTopic] = useState('')
  const [localStudentsEducationLevel, setLocalStudentsEducationLevel] = useState(StudentEducationLevel.NONE)

  const onStart = async () => {
    if (!localClassId) return setValidationError('Class ID is required')
    if (!localTeacherName) return setValidationError('Teacher name is required')
    if (!localClassMainTopic) return setValidationError('Class main topic is required')
    if (!localStudentsEducationLevel || localStudentsEducationLevel === StudentEducationLevel.NONE) return setValidationError('Education level is required')

    onClassStart(localClassId, localTeacherName, localClassMainTopic, localStudentsEducationLevel, localClassSubTopic)
    setValidationError('')
  }

  const onStop = async () => {
    onClassStop()
  }

  const onClassIdChange = (newValue: string) => {
    if (!newValue) return setLocalClassId('')

    const parsedValue = Number(newValue)
    if (isNaN(parsedValue)) return

    setLocalClassId(newValue)
  }

  const renderFormButton = () => {
    if (isClassStarted) return (
      <Button
        className={styles.btn}
        colorVariant={ButtonColorVariants.SECONDARY}
        sizeVariant={ButtonSizeVariants.LARGE}
        onClick={() => onStop()}
      >
        Stop
        <FaRegEyeSlash className={styles.btnIcon} size="1.9rem" />
      </Button>
    )

    return (
      <Button
        className={styles.btn}
        colorVariant={ButtonColorVariants.TERTIARY}
        sizeVariant={ButtonSizeVariants.LARGE}
        onClick={() => onStart()}
        disabled={localClassId && localTeacherName ? false : true}
      >
        Start
        <FaRegEye className={styles.btnIcon} size="1.9rem" />
      </Button>
    )
  }

  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.inputContainer}>
        <InputWithLabel
          label="Class ID"
          placeholder="Class ID (Numbers only)"
          value={localClassId}
          onChange={(newValue) => onClassIdChange(newValue)}
          required={true}
          className={styles.inputWithLabel}
          disabled={isClassStarted}
        />

        <InputWithLabel
          label="Name"
          placeholder="Full Name"
          value={localTeacherName}
          onChange={(newValue) => setLocalTeacherName(newValue)}
          required={true}
          className={styles.inputWithLabel}
          disabled={isClassStarted}
        />

        <InputWithLabel
          label="Class main topic"
          placeholder="Class main topic"
          value={localClassMainTopic}
          onChange={(newValue) => setLocalClassMainTopic(newValue)}
          required={true}
          className={styles.inputWithLabel}
          disabled={isClassStarted}
        />

        <InputWithLabel
          label="Class sub topic"
          placeholder="Class sub topic"
          value={localClassSubTopic}
          onChange={(newValue) => setLocalClassSubTopic(newValue)}
          required={false}
          className={styles.inputWithLabel}
          disabled={isClassStarted}
        />

        <div className={styles.studentsEducationLevelContainer}>
          <label className={styles.studentsEducationLevelLabel}>Education level <Required /> </label>
          <Dropdown className={styles.studentsEducationLevelDropdown}
            items={[
              { display: StudentEducationLevel.PRIMARY, onClick: () => setLocalStudentsEducationLevel(StudentEducationLevel.PRIMARY) },
              { display: StudentEducationLevel.SECONDARY, onClick: () => setLocalStudentsEducationLevel(StudentEducationLevel.SECONDARY) },
              { display: StudentEducationLevel.UNIVERSITY, onClick: () => setLocalStudentsEducationLevel(StudentEducationLevel.UNIVERSITY) },
              { display: StudentEducationLevel.MASTER, onClick: () => setLocalStudentsEducationLevel(StudentEducationLevel.MASTER) },
              { display: StudentEducationLevel.DOCTORATE, onClick: () => setLocalStudentsEducationLevel(StudentEducationLevel.DOCTORATE) },
            ]}
            disabled={isClassStarted}
          >
            <FaGraduationCap className={styles.educationLevelIcon} size="1.2rem" />
            <span className={styles.educationLevelDisplayText}>{localStudentsEducationLevel}</span>
          </Dropdown>
        </div>

        {renderFormButton()}
      </div>
      {validationError && <p className={styles.validationErrorText}>{validationError}</p>}
    </div>
  )
}
