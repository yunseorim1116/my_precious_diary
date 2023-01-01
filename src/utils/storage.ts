import { DIARY_KEY } from '../common/string'
import { DiaryType } from '../type/DiaryType';

export const setLocalStorage = (diaryData: DiaryType) => {
    const localItem = localStorage.getItem(DIARY_KEY) as string;
    let diaryList = JSON.parse(localItem) as any;
    if (diaryList === null) diaryList = [];
    diaryList.push(diaryData);
    const parseSting = JSON.stringify(diaryList) as string;
    localStorage.setItem(DIARY_KEY, parseSting);
  };