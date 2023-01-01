import { useEffect, useState } from "react";
import { DIARY_KEY } from "../common/string";
import { calculateTime } from "../utils/calculateTime";

import DiaryList from "../component/DiaryList";
import { DiaryType } from "../type/DiaryType";
import EmotionAverage from "../type/EmotionAverage";
import styled from "styled-components";
const DiaryListContainer = () => {
  const [diaryListData, setDiaryList] = useState([]);
  const [date, setDate] = useState<string>("");
  const [emotionAverage, setEmotionAverage] = useState<number>(0);

  const calculateEmotionGrade = (newData: any) => {
    const gradeList = newData.map((item: DiaryType) => {
      return item.emotionStatus.grade;
    }); //타입을 위해서 gradeList 분리

    const resultAvg = gradeList.reduce((acc: number, cur: number) => {
      return cur + acc;
    }, 0);

    const emotionAvg: number = resultAvg / gradeList.length;
    setEmotionAverage(emotionAvg);
  };

  useEffect(() => {
    const localItem = localStorage.getItem(DIARY_KEY) as string;
    let diaryList = JSON.parse(localItem) as any;

    const dateStr = calculateTime().slice(0, 7);
    const dateMonth = calculateTime().slice(5, 7).replace(/(^0+)/, "");
    setDate(dateMonth + "월");

    const newData = diaryList.filter((item: DiaryType) => {
      const dateMonth = item.diaryDate.slice(0, 7);
      return dateMonth === dateStr;
    });

    calculateEmotionGrade(newData);

    setDiaryList(diaryList);
  }, []);
  return (
    <>
      <Month>{date}</Month>
      <div>
        {diaryListData.map((diary: DiaryType) => {
          return (
            <>
              <DiaryList diary={diary}></DiaryList>
            </>
          );
        })}
        <div>이번달 감정 점수{emotionAverage} 점이요</div>
        <EmotionAverage />
      </div>
    </>
  );
};

const Month = styled.div`
  font-size: 32px;
  text-align: center;
  padding: 30px;
`;

export default DiaryListContainer;
