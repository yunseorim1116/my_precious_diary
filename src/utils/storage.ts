import { DIARY_KEY } from '../common/string'
import { DiaryCommentType, DiaryType } from '../type/DiaryType';

export const getLocalStorageData = (KEY : string)=>{
  const localItem = localStorage.getItem(KEY) as string;
  const diaryList = JSON.parse(localItem) as DiaryType[];
  return diaryList
  }

export const setLocalStorageData = (KEY : string,diaryData:DiaryType[])=>{
  const parseSting = JSON.stringify(diaryData) as string;
  localStorage.setItem(KEY, parseSting);
  }

export const setDiaryData = (diaryData: DiaryType) => {
  let diaryList =  getLocalStorageData(DIARY_KEY)
  if (diaryList === null) diaryList = [];
  diaryList.push(diaryData);
  setLocalStorageData(DIARY_KEY,diaryList)
};

export const getCommentData = (commentData: DiaryCommentType, id:string)=>{
    const localDiaryData = getLocalStorageData(DIARY_KEY);
    const findIndex = findItemIndex(localDiaryData,id)
    const diaryData = localDiaryData[findIndex].commentData as DiaryCommentType[];
    diaryData.push(commentData);
    setLocalStorageData(DIARY_KEY,localDiaryData)
  }


export const findItemIndex = (localDiaryData:DiaryType[],id:string)=>{
    const findIndex = localDiaryData.findIndex((item) => item.diaryId === id);
    return findIndex;
  }