import { ApiFaceAnalysisResult, FaceAnalysis, FaceAttentionCategory } from "../types/Attention"
import api from "../util/api"

type GetLatestDistractedApiResponse = {
  latestDistracted: ApiFaceAnalysisResult[]
}

type GetLatestScreenshotFacesApiResponse = {
  latestFaces: ApiFaceAnalysisResult[]
}

const getAttentionLevelCategory = (attentionLevel: number): FaceAttentionCategory => {
  if (attentionLevel <= 20) return FaceAttentionCategory.VERY_LOW
  if (attentionLevel <= 40) return FaceAttentionCategory.LOW
  if (attentionLevel <= 60) return FaceAttentionCategory.MEDIUM
  if (attentionLevel <= 80) return FaceAttentionCategory.HIGH

  return FaceAttentionCategory.VERY_HIGH
}

const mapApiFaceAnalysisResultToFaceAnalysis = (apiFaceAnalysisResult: ApiFaceAnalysisResult): FaceAnalysis => ({
  classId: apiFaceAnalysisResult.classId,
  isUncertainAnalysis: apiFaceAnalysisResult.isUncertainAnalysis,
  attentionLevel: apiFaceAnalysisResult.attentionLevel,
  attentionLevelCategory: getAttentionLevelCategory(apiFaceAnalysisResult.attentionLevel),
  screenshotTime: apiFaceAnalysisResult.screenshotTime,
  faceImageUrl: apiFaceAnalysisResult.faceImageUrl,
  faceIndex: apiFaceAnalysisResult.faceIndex,
})

export default {
  async getLatestDistracted(classId: string, classStartedAt: string): Promise<FaceAnalysis[]> {
    try {
      const latest = await api.get<GetLatestDistractedApiResponse>(
        `/distracted/latest`,
        [
          { key: 'classId', value: classId },
          { key: 'classStartedAt', value: classStartedAt }
        ]
      )
      return latest && latest.latestDistracted && Array.isArray(latest.latestDistracted)
        ? latest.latestDistracted.map(apiAnalysis => mapApiFaceAnalysisResultToFaceAnalysis(apiAnalysis))
        : []
    }
    catch (ex) {
      console.error('Error getting latest distracted [service]', ex)
      throw ex
    }
  },

  async getLatestScreenshotFaces(classId: string): Promise<FaceAnalysis[]> {
    try {
      const latest = await api.get<GetLatestScreenshotFacesApiResponse>(
        `/latest-screenshot/${classId}`
      )

      console.log('latest', latest.latestFaces.length, latest.latestFaces)

      return latest && latest.latestFaces && Array.isArray(latest.latestFaces)
        ? latest.latestFaces.map(apiAnalysis => mapApiFaceAnalysisResultToFaceAnalysis(apiAnalysis))
        : []
    }
    catch (ex) {
      console.error('Error getting latest screenshot faces [service]', ex)
      throw ex
    }
  }
}
