import { useState } from 'react'
import useTeacherRecommender from '../../common/hooks/useTeacherRecommender'
import { ClassActivityType, TeacherRecommendation } from '../../common/types/Class'
import { StudentEducationLevel } from '../../common/types/Students'
import Button, { ButtonColorVariants, ButtonSizeVariants } from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import InputWithLabel from '../../components/InputWithLabel'
import Spinner from '../../components/Spinner'
import TeacherRecommendationCard from '../../components/TeacherRecommendationCard'
import styles from './TeacherRecommender.module.css'

interface TeacherRecommendationProps {
  classId: string,
  classStartedAt: number,
  classMainTopic: string,
  studentsEducationLevel: StudentEducationLevel,
  classSubTopic?: string,
  className?: string,
}
export default function TeacherRecommendation(props: TeacherRecommendationProps) {
  const {
    classId,
    classStartedAt,
    classMainTopic,
    studentsEducationLevel,
    classSubTopic = '',
    className = '',
  } = props

  const [latestRecommendation, setLatestRecommendation] = useState({} as TeacherRecommendation)

  const {
    getNewTeacherRecommendation,
    apiError,
    isLoading,
  } = useTeacherRecommender()

  const onRecommendActivityClick = async (activityType: ClassActivityType) => {
    const recommendation = await getNewTeacherRecommendation(
      classId,
      classStartedAt.toString(),
      classMainTopic,
      classSubTopic,
      studentsEducationLevel,
      true,
      activityType
    )

    console.log('got new recommendation', recommendation)

    if (recommendation) setLatestRecommendation(recommendation)
  }

  const renderLatestRecommendation = () => {
    console.log('rendering latest', latestRecommendation)
    if (!latestRecommendation || !Array.isArray(latestRecommendation.recommendations)) return ''

    if (apiError) return <p>Error getting recommendation: {apiError}</p>

    return (
      <div className={styles.latestRecommendationContainer}>
        {latestRecommendation.recommendations.map((recommendation, index) => (
          <TeacherRecommendationCard
            recommendation={recommendation}
            key={`${index}-recommendation`}
            activityType={latestRecommendation.activityType}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <Dropdown
        className={styles.dropdown}
        position="bottom"
        items={[
          { display: 'Any', onClick: () => onRecommendActivityClick(ClassActivityType.ANY) },
          { display: 'Ice breaker activity', onClick: () => onRecommendActivityClick(ClassActivityType.ICE_BREAKER) },
          { display: 'Short video', onClick: () => onRecommendActivityClick(ClassActivityType.SHORT_VIDEO) },
          { display: 'Coffee break', onClick: () => onRecommendActivityClick(ClassActivityType.COFFEE_BREAK) },
          { display: 'Low attention activity', onClick: () => onRecommendActivityClick(ClassActivityType.CLASS_WIDE_ACTIVITY) },
        ]}
      >
        Recommend Activity
        {isLoading && <Spinner className={styles.spinner} size='small' />}
      </Dropdown>

      {renderLatestRecommendation()}
    </div>
  )
}
