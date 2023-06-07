import { useState } from "react"
import ClassService from "../services/ClassService"
import { ClassType } from "../types/Class"

export default function useActiveClass() {
  const [activeClass, setActiveClass] = useState<ClassType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const getActiveClass = async (classId: string) => {
    try {
      setIsLoading(true)
      setApiError('')
      const activeClass = await ClassService.findActiveClass(classId)
      if (activeClass) setActiveClass(activeClass)
    }
    catch (ex) {
      console.error('Error getting active class [hook]', ex)
      setApiError(JSON.stringify(ex))
    }
    setIsLoading(false)
  }

  const clearActiveClass = () => setActiveClass(null)

  return {
    apiError,
    isLoading,
    activeClass,
    getActiveClass,
    clearActiveClass,
  }
}
