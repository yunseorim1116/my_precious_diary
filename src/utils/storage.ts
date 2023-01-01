import { DIARY_KEY } from '../common/string'
import { DiaryCommentType, DiaryType } from '../type/DiaryType';

export const setLocalStorage = (diaryData: DiaryType) => {
    let diaryList =  getLocalStorage(DIARY_KEY)
    if (diaryList === null) diaryList = [];
    diaryList.push(diaryData);
    const parseSting = JSON.stringify(diaryList) as string;
    localStorage.setItem(DIARY_KEY, parseSting);
  };

  export const getLocalStorage = (KEY : string)=>{
    const localItem = localStorage.getItem(KEY) as string;
    const diaryList = JSON.parse(localItem) as DiaryType[];
    return diaryList
  }

  export const getCommentData = (commentData: DiaryCommentType, id:string)=>{
    const localDiaryData = getLocalStorage(DIARY_KEY);
    const findIndex = localDiaryData.findIndex((item) => item.diaryId === id);
    const diaryData = localDiaryData[findIndex].commentData as DiaryCommentType[];
    diaryData.push(commentData);
    const parseSting = JSON.stringify(localDiaryData) as string;
    localStorage.setItem(DIARY_KEY, parseSting);
  }

  export const setCommentData = (localDiaryData:DiaryType[])=>{
    const parseSting = JSON.stringify(localDiaryData) as string;
    localStorage.setItem(DIARY_KEY, parseSting);
  }