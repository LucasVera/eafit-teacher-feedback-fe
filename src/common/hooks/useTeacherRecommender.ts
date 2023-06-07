import { useState } from "react"
import TeacherRecommendationService from "../services/TeacherRecommendationService"
import { ClassActivityType, TeacherRecommendation } from "../types/Class"
import { StudentEducationLevel } from "../types/Students"

export default function useTeacherRecommender() {
  const [recommendations, setRecommendations] = useState([] as TeacherRecommendation[])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const getNewTeacherRecommendation = async (
    classId: string,
    classStartedAt: string,
    classMainTopic: string,
    classSubTopic: string,
    studentsEducationLevel: StudentEducationLevel,
    isVirtualClass: boolean,
    activityType: ClassActivityType
  ): Promise<TeacherRecommendation | undefined> => {
    try {
      setIsLoading(true)
      setApiError('')
      const recommendation = await TeacherRecommendationService.getTeacherRecommendation(
        classId,
        classStartedAt,
        classMainTopic,
        classSubTopic,
        studentsEducationLevel,
        isVirtualClass,
        activityType
      )
      if (recommendation) setRecommendations([...recommendations, recommendation])

      return recommendation
    }
    catch (ex) {
      console.error('Error getting teacher recommendation [hook]', ex)
      setApiError(JSON.stringify(ex))
    }
    finally {
      setIsLoading(false)
    }
  }

  const getLatestRecommendations = (recommendationsNum = 3) => recommendations
    .sort((a, b) => b.recommendedAt - a.recommendedAt)
    .slice(0, recommendationsNum)

  return {
    apiError,
    isLoading,
    recommendations,
    getLatestRecommendations,
    getNewTeacherRecommendation,
  }
}
