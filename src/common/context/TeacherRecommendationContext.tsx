import { createContext, PropsWithChildren, useState } from "react"
import { TeacherRecommendation } from "../types/Class"

export type TeacherRecommendationContextType = {
  classId: string,
  setClassId: (classId: string) => void,
  recommendations: TeacherRecommendation[],
  addRecommendation: (recommendation: TeacherRecommendation) => void,
  getLatestRecommendations: (recommendationsNum: number) => void,
}

const initialTeacherRecommendationContext: TeacherRecommendationContextType = {
  classId: '',
  setClassId: () => { },
  recommendations: [] as TeacherRecommendation[],
  addRecommendation: () => { },
  getLatestRecommendations: () => { },
}

export const TeacherRecommendationContext = createContext<TeacherRecommendationContextType>(initialTeacherRecommendationContext)

export const TeacherRecommendationContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [classId, setClassId] = useState('')
  const [recommendations, setRecommendations] = useState([] as TeacherRecommendation[])

  const addRecommendation = (newRecommendation: TeacherRecommendation) => setRecommendations(
    (prevRecommendations) => ([...prevRecommendations, newRecommendation])
  )

  const getLatestRecommendations = (recommendationsNum = 3) => (
    recommendations
      .sort((a, b) => b.recommendedAt - a.recommendedAt)
      .slice(0, recommendationsNum)
  )

  const contextValue: TeacherRecommendationContextType = {
    classId,
    setClassId,
    recommendations,
    addRecommendation,
    getLatestRecommendations,
  }

  return (
    <TeacherRecommendationContext.Provider value={contextValue}>
      {children}
    </TeacherRecommendationContext.Provider>
  )
}
