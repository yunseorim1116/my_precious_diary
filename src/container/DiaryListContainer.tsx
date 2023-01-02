import { useEffect, useState } from "react";
import { calculateTime } from "../utils/calculateTime";
import DiaryList from "../component/diaryList/DiaryList";
import { DiaryType } from "../type/DiaryType";
import styled from "styled-components";
import { getLocalStorageData } from "../utils/storage";
import { DIARY_KEY } from "../common/string";
const DiaryListContainer = () => {
  const [diaryListData, setDiaryList] = useState<DiaryType[]>([]);
  const [date, setDate] = useState<string>("");
  const [emotionAverage, setEmotionAverage] = useState<number>(0);

  const calculateEmotionGrade = (newData: any) => {
    if (!newData.length) return 0;

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
    const diaryList = getLocalStorageData(DIARY_KEY);
    const dateMonth = calculateTime().slice(5, 7).replace(/(^0+)/, "");

    const dateStr = calculateTime().slice(0, 7);
    const newData = diaryList.filter((item: DiaryType) => {
      const dateMonth = item.diaryDate.slice(0, 7);
      return dateMonth === dateStr;
    });

    setDate(dateMonth + "월");
    calculateEmotionGrade(newData);
    setDiaryList(diaryList);
  }, []);
  return (
    <ListContainer>
      <Month>{date}</Month>
      <div>
        {diaryListData.map((diary: DiaryType) => {
          return (
            <>
              <DiaryList diary={diary}></DiaryList>
            </>
          );
        })}
        <EmotionAvg>
          이번달 감정 점수<Avg> {emotionAverage}</Avg> 점이요
        </EmotionAvg>
      </div>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 700px;
  margin: auto;
  text-align: center;
`;

const Month = styled.div`
  font-size: 32px;
  text-align: center;
  padding: 30px;
`;

const Avg = styled.span`
  font-size: 25px;
`;

const EmotionAvg = styled.div`
  font-size: 18px;
  text-align: center;
`;

export default DiaryListContainer;
