import { useState } from "react"
import AttentionService from "../services/AttentionService"
import { FaceAnalysis } from "../types/Attention"

export default function useLatestScreenshotFaces() {
  const [latestScreenshotFaces, setLatestScreenshotFaces] = useState<FaceAnalysis[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const getLatestScreenshotFaces = async (classId: string) => {
    try {
      setIsLoading(true)
      setApiError('')
      const latest = await AttentionService.getLatestScreenshotFaces(classId)
      if (latest) setLatestScreenshotFaces(latest)
    }
    catch (ex) {
      console.error('Error getting latest screenshot faces [hook]', ex)
      setApiError(JSON.stringify(ex))
    }
    setIsLoading(false)
  }

  const clearLatestScreenshotFaces = () => setLatestScreenshotFaces([])

  return {
    apiError,
    isLoading,
    latestScreenshotFaces,
    getLatestScreenshotFaces,
    clearLatestScreenshotFaces,
  }
}
