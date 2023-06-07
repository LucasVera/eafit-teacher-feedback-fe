import { FaBook, FaChalkboardTeacher, FaCoffee, FaRegMeh, FaVideo } from 'react-icons/fa'
import { ClassActivityType } from '../../common/types/Class'
import styles from './TeacherRecommendationCard.module.css'

const activityTypes = [
  { type: ClassActivityType.ANY, text: 'Any', icon: <FaBook size='1.5rem' /> },
  { type: ClassActivityType.COFFEE_BREAK, text: 'Coffee Break', icon: <FaCoffee size='1.5rem' /> },
  { type: ClassActivityType.ICE_BREAKER, text: 'Ice Breaker', icon: <FaChalkboardTeacher size='1.5rem' /> },
  { type: ClassActivityType.SHORT_VIDEO, text: 'Short Video', icon: <FaVideo size='1.5rem' /> },
  { type: ClassActivityType.CLASS_WIDE_ACTIVITY, text: 'Low average attention', icon: <FaRegMeh size='1.5rem' /> },
]

interface TeacherRecommendationCardProps {
  recommendation: string,
  activityType: ClassActivityType
  className?: string,
}
export default function TeacherRecommendationCard(props: TeacherRecommendationCardProps) {
  const {
    recommendation,
    activityType,
    className = '',
  } = props

  const activityTypeFound = activityTypes.find((activityTypeItem) => activityTypeItem.type === activityType)
  let activityTypeText = ''
  let activityTypeIcon = <></>

  if (activityTypeFound) {
    activityTypeText = activityTypeFound.text
    activityTypeIcon = activityTypeFound.icon
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.activityTypeContainer}>{activityTypeText} {activityTypeIcon}</div>
      <p>{recommendation}</p>
    </div>
  )
}
