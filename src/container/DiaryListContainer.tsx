import { useEffect, useState } from "react";
import { calculateTime } from "../utils/calculateTime";
import DiaryList from "../component/diaryList/DiaryList";
import { DiaryType } from "../type/DiaryType";
import styled from "styled-components";
import { getLocalStorageData } from "../utils/storage";
import { DIARY_KEY } from "../common/string";
const DiaryListContainer = () => {
  interface monthType {
    allDateInfo: string;
    onlyMonthInfo: string;
    onlyYearInfo: string;
  }

  const month = {
    allDateInfo: "",
    onlyMonthInfo: "",
    onlyYearInfo: "",
  };

  const [diaryListData, setDiaryList] = useState<DiaryType[]>([]);
  const [date, setDate] = useState<monthType>(month);
  const [emotionAverage, setEmotionAverage] = useState<number>(0);

  const calculateEmotionGrade = (newData: any) => {
    if (!newData.length) return 0;

    const gradeList = newData.map((item: DiaryType) => {
      return item.emotionStatus.grade;
    }); //타입을 위해서 gradeList 분리

    const resultAvg = gradeList.reduce((acc: number, cur: number) => {
      return cur + acc;
    }, 0);

    const emotionAvg: number = Math.round(resultAvg / gradeList.length);
    setEmotionAverage(emotionAvg);
  };

  // useEffect(() => {
  //   const newData = diaryListData.filter((item: DiaryType) => {
  //     const dateMonthStr = item.diaryDate.dateYearMonthStr;
  //     return dateMonthStr === date.allDateInfo;
  //   });

  //   calculateEmotionGrade(newData);
  //   setDiaryList(newData);
  // }, [date]);

  useEffect(() => {
    console.log("ㅎㅠ");
    const diaryList = getLocalStorageData(DIARY_KEY).reverse();
    const dateInfoObj = calculateTime() as any;
    const { year, month, dateYearMonthStr } = dateInfoObj;

    const dateYearMonth = dateYearMonthStr; //년 + 월
    const onlyMonth = month; // only 월
    const onlyYear = year; // only 년도

    const dateInfo: monthType = {
      allDateInfo: dateYearMonth,
      onlyYearInfo: onlyYear,
      onlyMonthInfo: onlyMonth,
    };

    const newData = diaryList.filter((item: DiaryType) => {
      const dateMonthStr = item.diaryDate.dateYearMonthStr;
      return dateMonthStr === dateYearMonth;
    });

    setDate(dateInfo);
    calculateEmotionGrade(newData);
    setDiaryList(newData);
  }, []);

  const setNextMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    console.log(date);
  };

  const setPrevMonth = () => {
    const currentYear = Number(date.onlyYearInfo);
    const currentMonth = Number(date.onlyMonthInfo);

    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastMonth = new Date(
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1)
    );

    const prevMonth = lastMonth.getMonth() + 1;
    const year = lastMonth.getFullYear();
    const dateYearMonth = year + "-" + prevMonth;

    const dateInfo: monthType = {
      allDateInfo: dateYearMonth,
      onlyYearInfo: year.toString(),
      onlyMonthInfo: prevMonth.toString(),
    };

    setDate(dateInfo);
  };

  return (
    <ListContainer>
      <ListWrap>
        <EmotionAvgWrap>
          <EmotionAvg>
            <span> {date.onlyMonthInfo}월</span>의 감정 점수는
            <Avg> {emotionAverage} </Avg> 점 이에요!
          </EmotionAvg>
        </EmotionAvgWrap>
        <Month>
          <span onClick={setPrevMonth}>저번달</span> {date.onlyMonthInfo}월
          <span onClick={setNextMonth}>다음달</span>
        </Month>

        <DiaryListWrap>
          {diaryListData.map((diary: DiaryType) => {
            return (
              <>
                <DiaryList diary={diary}></DiaryList>
              </>
            );
          })}
        </DiaryListWrap>
      </ListWrap>
    </ListContainer>
  );
};

const DiaryListWrap = styled.div`
  padding: 10px 40px;
`;

const ListContainer = styled.div`
  background-color: #bfcbdc;
  height: 100vh;
  overflow: auto
  text-align: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ListWrap = styled.div`
  font-family: "GangwonEdu_OTFBoldA";
  cursor: pointer;
  background-color: #f9f9f9;
  width: 700px;
  height: 100vh;
  margin: auto;
  overflow: auto
  text-align: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Month = styled.div`
  font-size: 32px;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 25px;
`;

const Avg = styled.span`
  font-size: 25px;
  font-weight: 800;
`;

const EmotionAvgWrap = styled.div`
  padding: 20px 0px;
  width: 700px;
  position: fixed;
  background-color: #f9f9f9;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  justify-content: center;
`;
const EmotionAvg = styled.div`
  bottom: 15px;
  font-size: 18px;
`;

export default DiaryListContainer;
