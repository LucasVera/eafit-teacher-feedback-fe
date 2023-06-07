import styles from './ActiveClass.module.css'
import ClassForm from "../../containers/ClassForm"
import { useContext, useEffect, useRef, useState } from 'react'
import { ClassContext } from '../../common/context/ClassContext'
import Spinner from '../../components/Spinner'
import FaceCard from '../../components/FaceCard'
import { StudentEducationLevel } from '../../common/types/Students'
import TeacherRecommender from '../../containers/TeacherRecommender'
import useActiveClass from '../../common/hooks/useActiveClass'
import useLatestScreenshotFaces from '../../common/hooks/useLatestScreenshotFaces'

const SCREENSHOT_FACES_REFRESH_INTERVAL_SECONDS = 15

interface CurrentActiveClassRef {
  currentClassId: string,
  currentClassStartedAt: number,
}

export default function ActiveClass() {
  const [lastFetchedAt, setLastFetchedAt] = useState('')
  const [isClassStarted, setIsClassStarted] = useState(false)

  const {
    classId,
    teacherName,
    classMainTopic,
    classSubTopic,
    studentsEducationLevel,
    setClassId,
    setTeacherName,
    setClassMainTopic,
    setClassSubTopic,
    setStudentsEducationLevel,
  } = useContext(ClassContext)

  const {
    apiError: findLatestScreenshotFacesApiError,
    isLoading: findLatestScreenshotFacesIsLoading,
    getLatestScreenshotFaces,
    clearLatestScreenshotFaces,
    latestScreenshotFaces,
  } = useLatestScreenshotFaces()

  const {
    activeClass,
    getActiveClass,
    clearActiveClass,
    apiError: activeClassApiError,
    isLoading: activeClassIsLoading,
  } = useActiveClass()

  const intervalRef = useRef(0)
  const classRef = useRef({} as CurrentActiveClassRef)

  classRef.current = {
    currentClassId: classId,
    currentClassStartedAt: activeClass?.classStartedAt || 0,
  } as CurrentActiveClassRef

  const fetchLatest = (classId: string) => {
    getLatestScreenshotFaces(classId)
    setLastFetchedAt(new Date().toTimeString())
  }

  useEffect(() => {
    console.log('use effect hook of activeClass', activeClass, intervalRef.current)
    if (!activeClass) {
      // stop interval since no active class is found
      clearInterval(intervalRef.current)
      intervalRef.current = 0
    } else {
      // When active class is found, start the interval.
      // But only if interval isn't already running
      if (intervalRef.current) return

      const interval = setInterval(() => {
        const {
          currentClassId,
          currentClassStartedAt,
        } = classRef.current

        if (currentClassId && currentClassStartedAt)
          fetchLatest(currentClassId)

      }, SCREENSHOT_FACES_REFRESH_INTERVAL_SECONDS * 1000)
      intervalRef.current = interval as any

      return () => clearInterval(intervalRef.current)
    }
  }, [activeClass])

  const onClassStart = (
    newClassId: string,
    newTeacherName: string,
    newClassMainTopic: string,
    newStudentsEducationLevel: StudentEducationLevel,
    newClassSubTopic?: string,
    classStartedAt = 1 // defaults to "all time"
  ) => {
    setClassId(newClassId)
    setTeacherName(newTeacherName)
    setClassMainTopic(newClassMainTopic)
    setClassSubTopic(newClassSubTopic || '')
    setStudentsEducationLevel(newStudentsEducationLevel)
    setIsClassStarted(true)

    fetchLatest(newClassId)
    getActiveClass(newClassId)
  }

  const onClassStop = () => {
    setClassId('')
    setTeacherName('')
    setClassMainTopic('')
    setClassSubTopic('')
    setStudentsEducationLevel(StudentEducationLevel.NONE)
    setIsClassStarted(false)

    clearActiveClass()
    setLastFetchedAt('')
    clearLatestScreenshotFaces()
  }

  const renderLatestScreenshotFacesCards = () => {
    if (latestScreenshotFaces && Array.isArray(latestScreenshotFaces) && latestScreenshotFaces.length > 0) {
      return (
        <>
          {latestScreenshotFaces.map((faceAnalysis) => (
            <FaceCard
              key={faceAnalysis.faceIndex}
              faceAnalysis={faceAnalysis}
            />
          ))}
        </>
      )
    }

    return <p className={styles.notFoundText}>No faces found</p>
  }

  const renderFacesContainer = () => {
    if (findLatestScreenshotFacesApiError) {
      const error = JSON.parse(findLatestScreenshotFacesApiError)?.message ?? findLatestScreenshotFacesApiError
      return <p className={styles.errorText}>Error: {error}</p>
    }

    if (activeClassApiError) {
      const error = JSON.parse(activeClassApiError)?.message ?? activeClassApiError
      return <p className={styles.errorText}>Error: {error}</p>
    }

    if (!activeClass || !activeClass.classId) {
      return <p className={styles.notFoundText}>No active class found with that id</p>
    }

    if (!latestScreenshotFaces) {
      return <p className={styles.notFoundText}>No faces found</p>
    }

    return renderLatestScreenshotFacesCards()
  }

  const renderActiveClassSection = () => {
    if (!activeClass?.classId) {
      return <></>
    }

    return (
      <div className={styles.currentClassContainer}>
        {/* Commented this info since it's available in the "class form" - No need to display it twice */}
        {/* <p className={styles.currentClassTextContainer}>
          <span className={styles.currentClassTextLabel}>Class ID </span>
          <span className={styles.currentClassTextValue}>{classId}</span>
        </p>
        <p className={styles.currentClassTextContainer}>
          <span className={styles.currentClassTextLabel}>Teacher Name </span>
          <span className={styles.currentClassTextValue}>{teacherName}</span>
        </p>
        <p className={styles.currentClassTextContainer}>
          <span className={styles.currentClassTextLabel}>Class main topic </span>
          <span className={styles.currentClassTextValue}>{classMainTopic}</span>
        </p>
        {classSubTopic && <p className={styles.currentClassTextContainer}>
          <span className={styles.currentClassTextLabel}>Class sub topic </span>
          <span className={styles.currentClassTextValue}>{classSubTopic}</span>
        </p>}
        <p className={styles.currentClassTextContainer}>
          <span className={styles.currentClassTextLabel}>Students education </span>
          <span className={styles.currentClassTextValue}>{studentsEducationLevel}</span>
        </p> */}

        <p className={styles.currentClassTextContainer}>
          <span className={styles.currentClassTextLabel}>Last fetched at </span>
          <span className={styles.currentClassTextValue}>{lastFetchedAt}</span>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ClassForm
        onClassStart={(
          newClassId: string,
          teacherName: string,
          classMainTopic: string,
          studentsEducationLevel: StudentEducationLevel,
          classSubTopic?: string,
        ) => onClassStart(
          newClassId,
          teacherName,
          classMainTopic,
          studentsEducationLevel,
          classSubTopic,
          activeClass?.classStartedAt,
        )}
        onClassStop={() => onClassStop()}
        isClassStarted={isClassStarted}
      />

      {renderActiveClassSection()}

      {isClassStarted
        ? <div className={styles.activeClassContainer}>
          {(findLatestScreenshotFacesIsLoading || activeClassIsLoading) && latestScreenshotFaces?.length <= 0 && <Spinner />}
          <div className={styles.latestScreenshotFacesContainer}>
            {renderFacesContainer()}
          </div>
        </div>
        : <p className={styles.instructionsText}>Please, fill the text boxes and hit the "Start class" button to start the assistant</p>
      }

      {/* <FaceCard faceAnalysis={{
        attentionLevel: 60,
        attentionLevelCategory: FaceAttentionCategory.VERY_HIGH,
        classId: 2,
        faceImageUrl: 'https://google.com',
        faceIndex: 1,
        isUncertainAnalysis: false,
        screenshotTime: 4
      }} /> */}

      {activeClass?.classId && <TeacherRecommender
        classId={classId}
        classStartedAt={activeClass?.classStartedAt || 1}
        classMainTopic={classMainTopic}
        classSubTopic={classSubTopic}
        studentsEducationLevel={studentsEducationLevel}
      />}

    </div>
  )
}
