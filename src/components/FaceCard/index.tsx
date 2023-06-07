import { FaceAnalysis, FaceAttentionCategory } from '../../common/types/Attention'
import styles from './FaceCard.module.css'

interface FaceCardProps {
  className?: string
  faceAnalysis: FaceAnalysis
}

enum AttentionLevelColors {
  GRAY = '#aaaaaa',
  RED = '#ff4040',
  YELLOW = '#fffc40',
  GREEN = '#6aff40',
}

const AttentionCategoryBgColors = [
  { category: FaceAttentionCategory.VERY_LOW, color: AttentionLevelColors.RED },
  { category: FaceAttentionCategory.LOW, color: AttentionLevelColors.RED },
  { category: FaceAttentionCategory.MEDIUM, color: AttentionLevelColors.YELLOW },
  { category: FaceAttentionCategory.HIGH, color: AttentionLevelColors.GREEN },
  { category: FaceAttentionCategory.VERY_HIGH, color: AttentionLevelColors.GREEN },
]
const defaultAttentionCategoryBgColor = AttentionLevelColors.GRAY

const attentionCategoryToBgColor = (attentionCategory: FaceAttentionCategory) => {
  const attentionCategoryBgColor = AttentionCategoryBgColors.find((bgColor) => bgColor.category === attentionCategory)
  return attentionCategoryBgColor?.color ?? defaultAttentionCategoryBgColor
}

export default function FaceCard(props: FaceCardProps) {
  const {
    faceAnalysis,
    className = '',
  } = props

  const faceBgColor = attentionCategoryToBgColor(faceAnalysis.attentionLevelCategory)

  return (
    <div className={`${className} ${styles.container}`} key={faceAnalysis.faceIndex}>
      <div className={styles.headerContainer} style={{ backgroundColor: faceBgColor }}>
        <img className={styles.faceImage} src={faceAnalysis.faceImageUrl} alt={`Face of student with index ${faceAnalysis.faceIndex}`} />
      </div>

      <div className={styles.bodyContainer}>
        <p className={styles.attentionLevelPercent}>{faceAnalysis.attentionLevel} %</p>
      </div>
    </div>
  )
}
