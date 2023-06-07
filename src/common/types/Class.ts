import { StudentEducationLevel } from "./Students"

export type ApiFindClassResult = {
  class: {
    classId: number,
    screenshotIntervalSeconds: number,
    screenshotBasePath: string,
    screenshotsBucketName: string,
    startedAtUtc: string,
  }
}

export type ClassType = {
  classId: number,
  classStartedAt: number,
  screenshotIntervalSeconds: number,
}

export enum ClassActivityType {
  ANY = 'ANY',
  CLASS_WIDE_ACTIVITY = 'CLASS_WIDE_ACTIVITY', // ai-generated activity based on average students' attention level
  ICE_BREAKER = 'ICE_BREAKER', // ai-generated activity
  SHORT_VIDEO = 'SHORT_VIDEO', // ai-recommended video
  COFFEE_BREAK = 'COFFEE_BREAK', // short break (5-15 min)
}

export type ApiTeacherRecommendationResult = {
  recommendation: ClassActivityOutput
}

export type TeacherRecommendation = {
  classId: string,
  recommendations: string[],
  recommendedAt: number,
  activityType: ClassActivityType,
}

export type StudentEducationLevelInput = {
  type: StudentEducationLevel,
  name: string,
  prompt: string,
}

export type ClassSubjectInput = {
  name: string,
  prompt: string,
}

export type ClassActivityInput = {
  typeInput: ClassActivityTypeInput,
  subjectInput?: ClassSubjectInput,
  studentsEducationLevelInput?: StudentEducationLevelInput,
  isVirtualClass?: boolean,
}

export type ClassActivityOutput = {
  classId: string,
  input: ClassActivityInput
  finalPrompt: string,
  result: string[]
  recommendedAt: number,
}

export type ClassActivityTypeInput = {
  type: ClassActivityType,
  name: string,
  prompt: string,
}
