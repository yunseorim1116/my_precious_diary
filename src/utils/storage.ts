import { DIARY_KEY } from '../common/string'
import { DiaryCommentType, DiaryType } from '../type/DiaryType';

export const setLocalStorage = (diaryData: DiaryType) => {
    const localItem = localStorage.getItem(DIARY_KEY) as string;
    let diaryList = JSON.parse(localItem) as DiaryType[];
    if (diaryList === null) diaryList = [];
    diaryList.push(diaryData);
    const parseSting = JSON.stringify(diaryList) as string;
    localStorage.setItem(DIARY_KEY, parseSting);
  };

  export const getLocalStorage = ()=>{
    const localItem = localStorage.getItem(DIARY_KEY) as string;
    const diaryList = JSON.parse(localItem) as DiaryType[];
    return diaryList
  }

  export const getCommentData = (commentData: DiaryCommentType, id:string)=>{
    const localDiaryData = getLocalStorage();
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