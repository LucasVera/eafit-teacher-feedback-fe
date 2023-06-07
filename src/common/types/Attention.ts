export type EmotionName = 'CALM' | 'SAD' | 'SURPRISED' | 'FEAR' | 'CONFUSED' | 'ANGRY' | 'DISGUSTED' | 'HAPPY'

export type Emotion = { [name in EmotionName]: number }

export type ApiFaceAnalysisResult = {
  classId: number,
  isUncertainAnalysis: boolean,
  attentionLevel: number,
  faceImageUrl: string,
  faceImageS3Location: string,
  screenshotTime: number,
  createdAt: number,
  rawEmotions: Emotion[],
  faceIndex: number,
}

export enum FaceAttentionCategory {
  VERY_LOW = 'Very Low',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'Very High'
}

export type FaceAnalysis = {
  classId: number,
  isUncertainAnalysis: boolean,
  attentionLevel: number,
  attentionLevelCategory: FaceAttentionCategory,
  screenshotTime: number,
  faceImageUrl: string,
  faceIndex: number,
}
