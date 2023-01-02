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
import { DiaryCommentType, DiaryType } from "../type/DiaryType";
import { useLocation, useNavigate } from "react-router";
import { DIARY_KEY } from "../common/string";
import { DiaryList } from "../router/routerPath";

const AddDiaryContainer = ({ diaryData }: any) => {
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
    selectEmotion(diaryDataObj.emotionStatus);
    setIsEdit(true);
    diaryContent.current.value = diaryDataObj.diaryContent;
    diaryTitle.current.value = diaryDataObj.diaryTitle;
  }, []);

  const diaryContent = useRef<any>("");
  const diaryTitle = useRef<any>("");

  const selectEmotion = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const submitAddDiary = () => {
    const dateTime = calculateTime();
    const diaryId = createId();

    const diaryData = {
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
      <div>소중한 나의 감정기록 작성하기</div>

      <EmotionTitle>오늘의 나의 기분은 어떤가요?</EmotionTitle>

      <ul>
        {emotionList?.map((emotion: EmotionType) => {
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
      <input placeholder="제목" ref={diaryTitle}></input>
      <div>
        <DiaryContent placeholder="여기에 입력하세요" ref={diaryContent} />
      </div>
      <Button clickFunction={submitAddDiary} text="일기등록" />
    </DiaryContainer>
  );
};

export default AddDiaryContainer;

const DiaryContainer = styled.div`
  text-align: center;
  margin: auto;
`;
const DiaryContent = styled.textarea`
  width: 500px;
  height: 400px;
`;

const EmotionTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
`;
