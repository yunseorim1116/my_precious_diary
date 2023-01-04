import { EmotionType } from './EmotionType';
export interface DiaryCommentType {
    commentId: string,
    commentContent: string,
    commentDate:string
}
export interface DiaryType {
    diaryTitle: string,
    diaryContent: string,
    emotionStatus: EmotionType ,
    diaryDate: string,
    diaryId:string
    commentData: [] | DiaryCommentType[]
}

