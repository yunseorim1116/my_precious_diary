import { EmotionType } from './EmotionType';

export interface DiaryType {
    diaryTitle: string,
    diaryContent: string,
    emotionStatus: EmotionType,
    diaryDate: string,
}