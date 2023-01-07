import { useEffect, useState } from "react";
import { calculateTime } from "../utils/calculateTime";
import DiaryList from "../component/diaryList/DiaryList";
import { DiaryType } from "../type/DiaryType";
import styled from "styled-components";
import { getLocalStorageData } from "../utils/storage";
import { setMonth } from "../utils/calculateTime";
import { DIARY_KEY, PREV, NEXT } from "../common/string";
import { monthDataInfo } from "../common/obj";
import { useNavigate } from "react-router";
import { Home } from "../router/routerPath";
import NoneData from "../component/share/NoneData";

const DiaryListContainer = () => {
  interface monthType {
    allDateInfo: string;
    onlyMonthInfo: string;
    onlyYearInfo: string;
  }

  const [allDiaryData, setAllDiaryData] = useState<DiaryType[]>([]);
  const [diaryListData, setDiaryList] = useState<DiaryType[]>([]);
  const [date, setDate] = useState<monthType>(monthDataInfo);
  const [emotionAverage, setEmotionAverage] = useState<number>(0);
  const [isTodayMonth, setIsTodayMonth] = useState(false);
  const navigate = useNavigate();

  const calculateEmotionGrade = (newData: DiaryType[]) => {
    if (!newData.length) return 0;

    const gradeList = newData.map((item: DiaryType) => {
      return item.emotionStatus.grade;
    }); //타입을 위해서 gradeList 분리
    const resultAvg = gradeList.reduce((acc: number, cur: number) => {
      return cur + acc;
    }, 0);

    const emotionAvg: number = Math.round(resultAvg / gradeList.length);
    return emotionAvg;
  };

  useEffect(() => {
    const filterMonthData = allDiaryData.filter((item: DiaryType) => {
      const dateMonthStr = item.diaryDate.dateYearMonthStr;
      return dateMonthStr === date.allDateInfo;
    });

    setEmotionAverage(calculateEmotionGrade(filterMonthData));
    setDiaryList(filterMonthData);

    const todayMonth = calculateTime().month;
    if (date.onlyMonthInfo === todayMonth) setIsTodayMonth(false);
    else setIsTodayMonth(true);
  }, [date]);

  useEffect(() => {
    const localStorageData = getLocalStorageData(DIARY_KEY);
    const dateInfoObj = calculateTime();
    const { year, month, dateYearMonthStr } = dateInfoObj;

    const dateInfo: monthType = {
      allDateInfo: dateYearMonthStr,
      onlyYearInfo: year,
      onlyMonthInfo: month,
    };

    if (localStorageData === null) {
      setAllDiaryData([]);
      setDate(dateInfo);
      return;
    }

    const diaryList = localStorageData.reverse();
    setAllDiaryData(diaryList);
    setDate(dateInfo);
    setEmotionAverage(calculateEmotionGrade(diaryList));
    setDiaryList(diaryList);
  }, []);

  const goToMainPage = () => navigate(Home);

  const setNextMonth = () => {
    const dateInfo = setMonth(date, NEXT);
    setDate(dateInfo);
  };

  const setPrevMonth = () => {
    const dateInfo = setMonth(date, PREV);
    setDate(dateInfo);
  };

  return (
    <ListContainer>
      <ListWrap>
        <EmotionAvgWrap>
          <PrevArrow
            src="/assets/icon/back_arrow_icon.png"
            onClick={goToMainPage}
          />
          <EmotionAvg>
            <span> {date.onlyMonthInfo}월</span>의 감정 점수는
            <Avg> {emotionAverage} </Avg> 점 이에요!
          </EmotionAvg>
          <DiaryYear>{date.onlyYearInfo}</DiaryYear>
        </EmotionAvgWrap>

        <MonthWrap>
          <PrevArrow
            src="/assets/icon/back_arrow_icon.png"
            onClick={setPrevMonth}
          />
          <div> {date.onlyMonthInfo}월</div>
          <NextArrow
            src="/assets/icon/back_arrow_icon.png"
            onClick={setNextMonth}
            isTodayMonth={isTodayMonth}
          />
        </MonthWrap>

        <DiaryListWrap>
          {diaryListData.map((diary: DiaryType) => {
            return (
              <>
                <DiaryList diary={diary}></DiaryList>
              </>
            );
          })}
        </DiaryListWrap>

        {!diaryListData.length && <NoneData />}
      </ListWrap>
    </ListContainer>
  );
};

interface NextArrowType {
  isTodayMonth: boolean;
}

const NextArrow = styled.img<NextArrowType>`
  visibility: ${(props) => !props.isTodayMonth && "hidden"};
  width: 35px;
  transform: scaleX(-1);
  padding: 0px 10px;
`;

const DiaryYear = styled.div`
  margin-right: 20px;
  align-items: center;
  color: #7e7e7e;
  font-size: 32px;
`;

const PrevArrow = styled.img`
  width: 35px;
  margin-left: 10px;
  padding: 0px 10px;
`;

const DiaryListWrap = styled.div`
  padding: 10px 40px;
`;

const ListContainer = styled.div`

  height: 100vh;
  overflow: auto
  text-align: center;

`;

const ListWrap = styled.div`
  font-family: "GangwonEdu_OTFBoldA";
  cursor: pointer;
  background-color: #f9f9f9;
  width: 700px;
  height: 100vh;
  margin: auto;
  text-align: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MonthWrap = styled.div`
  font-size: 32px;
  padding-top: 110px;
  padding-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: space-between;
  align-items: center;
`;

const EmotionAvg = styled.div`
  bottom: 15px;
  font-size: 18px;
`;

export default DiaryListContainer;
