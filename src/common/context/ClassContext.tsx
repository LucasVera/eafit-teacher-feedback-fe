import { createContext, PropsWithChildren, useState } from "react"
import { StudentEducationLevel } from "../types/Students"

export type ClassContextType = {
  classId: string
  teacherName: string
  classMainTopic: string
  classSubTopic?: string
  studentsEducationLevel: StudentEducationLevel
  setClassId: (classId: string) => void
  setTeacherName: (teacher: string) => void
  setClassMainTopic: (classMainTopic: string) => void
  setClassSubTopic: (classSubTopic: string) => void
  setStudentsEducationLevel: (studentsEducationLevel: StudentEducationLevel) => void
}

const initialClassContext: ClassContextType = {
  classId: '',
  teacherName: '',
  classMainTopic: '',
  classSubTopic: '',
  studentsEducationLevel: StudentEducationLevel.PRIMARY,
  setClassId: () => { },
  setTeacherName: () => { },
  setClassMainTopic: () => { },
  setClassSubTopic: () => { },
  setStudentsEducationLevel: () => { },
}

export const ClassContext = createContext<ClassContextType>(initialClassContext)

export const ClassContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [classId, setClassId] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [classMainTopic, setClassMainTopic] = useState('')
  const [classSubTopic, setClassSubTopic] = useState('')
  const [studentsEducationLevel, setStudentsEducationLevel] = useState(StudentEducationLevel.PRIMARY)


  const contextValue: ClassContextType = {
    classId,
    teacherName,
    classMainTopic,
    classSubTopic,
    studentsEducationLevel,
    setClassId,
    setTeacherName,
    setClassMainTopic,
    setClassSubTopic,
    setStudentsEducationLevel,
  }

  return (
    <ClassContext.Provider value={contextValue}>
      {children}
    </ClassContext.Provider>
  )
}
