import { useEffect, useRef } from "react";
import Button from "../component/share/Button";
import { useState } from "react";
import styled from "styled-components";
import DiaryEmotion from "../component/share/DiaryEmotion";
import { EmotionType } from "../type/EmotionType";
import { calculateTime } from "../utils/calculateTime";
import { emotionArr } from "../data/emotionData";
import { setDiaryData, getLocalStorageData } from "../utils/storage";
import { createId } from "../utils/createId";
import { DiaryType } from "../type/DiaryType";
import { useLocation, useNavigate } from "react-router";
import { DIARY_KEY } from "../common/string";
import { DiaryList } from "../router/routerPath";

const AddDiaryContainer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [emotionList, setEmotionList] = useState<EmotionType[]>(emotionArr);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(
    emotionList[2]
  );

  useEffect(() => {
    if (!state) return;
    const { diaryDataObj } = state;
    setSelectedEmotion(diaryDataObj.emotionStatus);
    setIsEdit(true);
    diaryContent.current.value = diaryDataObj.diaryContent;
    diaryTitle.current.value = diaryDataObj.diaryTitle;
  }, []);
  useEffect(() => {}, []);

  const diaryContent = useRef<any>("");
  const diaryTitle = useRef<any>("");

  const selectEmotion = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const submitAddDiary = () => {
    const dateTime = calculateTime();
    const diaryId = createId();

    const diaryData: DiaryType = {
      diaryTitle: diaryTitle.current.value,
      diaryContent: diaryContent.current.value,
      emotionStatus: selectedEmotion,
      diaryDate: dateTime,
      diaryId,
      commentData: [],
    };

    if (state) {
      // 수정
      const { diaryDataObj } = state;
      if (!diaryData) return;
      diaryData.diaryId = diaryDataObj.id;
      const localDiaryData = getLocalStorageData(DIARY_KEY);

      const findIndex = localDiaryData.findIndex(
        (item) => item.diaryId === diaryDataObj.id
      );

      localDiaryData[findIndex] = diaryData;
      const parseSting = JSON.stringify(localDiaryData) as string;
      localStorage.setItem(DIARY_KEY, parseSting);
    } else setDiaryData(diaryData);

    if (diaryData.diaryContent === "" || diaryData.diaryTitle === "") return;

    navigate(DiaryList);
  };

  return (
    <DiaryContainer>
      <DiaryWrap>
        <EmotionWrap>
          <EmotionTitle>오늘의 나의 기분은 어떤가요?</EmotionTitle>
          <ul>
            {emotionList.map((emotion: EmotionType) => {
              return (
                <>
                  <DiaryEmotion
                    key={emotion.id}
                    emotion={emotion}
                    selectEmotion={selectEmotion}
                    selectedEmotion={selectedEmotion}
                  />
                </>
              );
            })}
          </ul>
        </EmotionWrap>
        <DiaryContentWrap>
          <DiaryTitle placeholder="제목" ref={diaryTitle}></DiaryTitle>
          <DiaryContent placeholder="여기에 입력하세요" ref={diaryContent} />
        </DiaryContentWrap>
        <ButtonWrap>
          <Button clickFunction={submitAddDiary} text="일기등록" />
        </ButtonWrap>
      </DiaryWrap>
    </DiaryContainer>
  );
};

export default AddDiaryContainer;
const ButtonWrap = styled.div`
  text-align: center;
`;
const DiaryTitle = styled.input`
  font-family: "FlowerSalt";
  border: none;
  width: 100%;
  border-bottom: 1px solid #b0b0b0;
  font-size: 32px;
  margin-top: 15px;
  padding-bottom: 10px;
  text-align: left;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
  }
`;
const EmotionWrap = styled.div`
  text-align: center;
`;
const DiaryWrap = styled.div`
  background-color: #f9f9f9;
  width: 700px;
  height: 100vh;
  margin: auto;
`;
const DiaryContainer = styled.div`
  font-family: "GangwonEdu_OTFBoldA";
  background-color: #bfcbdc;
  width: 100vw;
  align-items: center;
`;
const DiaryContentWrap = styled.div`
  margin: 0px 30px;
`;
const DiaryContent = styled.textarea`
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 18px;
  padding: 20px 5px;
  display: block;
  background-color: #f9f9f9;
  border: none;
  &:focus {
    outline: none;
  }
  width: 500px;
  height: 300px;
`;

const EmotionTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
  padding: 25px 0px;
`;
