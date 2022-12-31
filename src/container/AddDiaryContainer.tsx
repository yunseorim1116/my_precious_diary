import { useRef } from "react";
import Button from "../component/share/Button";
import EmotionList from "../component/share/EmotionList";
import { useState } from "react";
import styled from "styled-components";
const AddDiaryContainer = () => {
  const today = new Date();

  const [selectedEmotion, setSelectedEmotion] = useState("감정3");
  const diaryContent = useRef<any>("");
  const diaryTitle = useRef<any>("");

  const selectEmotion = (e: any) => {
    setSelectedEmotion(e.target.textContent);
  };

  const submitAddDiary = () => {
    const diaryData = {
      diaryTitle: diaryTitle.current.value,
      diaryContent: diaryContent.current.value,
      emotionStatus: null,
      diaryDate: today.toLocaleString(),
    };

    if (diaryData.diaryContent === "") return;
    const spliceDate = diaryData.diaryDate.slice(0, 12);
    diaryContent.current.value = "";
    diaryTitle.current.value = "";
  };

  return (
    <DiaryContainer>
      <div>소중한 나의 다이어리 작성하기</div>

      <EmotionTitle>오늘의 나의 기분은 어떤가요?</EmotionTitle>
      <EmotionList selectEmotion={selectEmotion} />
      <input placeholder="제목" ref={diaryTitle}></input>
      <div>
        <DiaryContent
          placeholder="여기에 입력하세요"
          ref={diaryContent}
          value={diaryContent.current.textContent}
        />
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
