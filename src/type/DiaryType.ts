import { EmotionType } from './EmotionType';
export interface DiaryCommentType {
    commentId: string,
    commentContent: string,
    commentDate:string
}

export interface DiaryDateType {
    date:string|any,
    year:string,
    month:string,
    day:string,
    dateYearMonthStr:string,
    allDateStr:string
}

export interface DiaryType {
    diaryTitle: string,
    diaryContent: string,
    emotionStatus: EmotionType ,
    diaryDate: DiaryDateType,
    diaryId:string
    commentData: [] | DiaryCommentType[]
}

