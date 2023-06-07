import { useState } from "react"
import AttentionService from "../services/AttentionService"
import { FaceAnalysis } from "../types/Attention"

export default function useLatestDistracted() {
  const [latestDistracted, setLatestDistracted] = useState<FaceAnalysis[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const getLatestDistracted = async (classId: string, classStartedAt: number) => {
    try {
      setIsLoading(true)
      setApiError('')
      const latest = await AttentionService.getLatestDistracted(classId, classStartedAt.toString())
      if (latest) setLatestDistracted(latest)
    }
    catch (ex) {
      console.error('Error getting latest distracted [hook]', ex)
      setApiError(JSON.stringify(ex))
    }
    setIsLoading(false)
  }

  const clearLatestDistracted = () => setLatestDistracted([])

  return {
    apiError,
    isLoading,
    latestDistracted,
    getLatestDistracted,
    clearLatestDistracted,
  }
}
