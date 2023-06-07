import { ApiTeacherRecommendationResult, ClassActivityType, TeacherRecommendation } from "../types/Class"
import { StudentEducationLevel } from "../types/Students"
import api from "../util/api"

export default {
  async getTeacherRecommendation(
    classId: string,
    classStartedAt: string,
    classMainTopic: string,
    classSubTopic: string,
    studentsEducationLevel: StudentEducationLevel,
    isVirtualClass: boolean,
    activityType: ClassActivityType
  ): Promise<TeacherRecommendation> {
    try {

      const teacherRecommendation = await api.get<ApiTeacherRecommendationResult>(
        `/teacher-recommendation`,
        [
          { key: 'classId', value: classId },
          { key: 'classStartedAt', value: classStartedAt },
          { key: 'classMainTopic', value: classMainTopic },
          // { key: 'classMainTopic', value: 'Matematicas' },
          { key: 'classSubTopic', value: classSubTopic },
          // { key: 'classSubTopic', value: 'Minimo comun multiplo' },
          { key: 'studentsEducationLevel', value: studentsEducationLevel },
          // { key: 'studentsEducationLevel', value: StudentEducationLevel.PRIMARY },
          { key: 'isVirtualClass', value: isVirtualClass ? 'true' : 'false' },
          { key: 'activityType', value: activityType }
        ]
      )

      if (!teacherRecommendation || !teacherRecommendation.recommendation) {
        throw new Error('Error getting teacher recommendation from api - [service]')
      }

      return {
        classId: teacherRecommendation.recommendation.classId,
        recommendations: teacherRecommendation.recommendation.result,
        recommendedAt: teacherRecommendation.recommendation.recommendedAt,
        activityType: teacherRecommendation.recommendation.input.typeInput.type,
      }
    }
    catch (ex) {
      console.error('Error getting teacher recommendation [service]', ex)
      throw ex
    }
  }
}
