import { useEffect, useRef } from "react";
import Button from "../component/share/Button";
import { useState } from "react";
import styled from "styled-components";
import Emotion from "../component/Emotion";
import { EmotionType } from "../type/EmotionType";

const AddDiaryContainer = () => {
  const imgUrl = "/assets/img/";
  const emotionArr = [
    {
      imgUrl: `${imgUrl}매우좋음_5.png`,
      grade: 5,
      id: "매우좋음5",
    },
    {
      imgUrl: `${imgUrl}좋음_4.png`,
      grade: 4,
      id: "좋음4",
    },
    {
      imgUrl: `${imgUrl}무난_3.png`,
      grade: 3,
      id: "무난3",
    },
    {
      imgUrl: `${imgUrl}슬픔_2.png`,
      grade: 2,
      id: "슬픔2",
    },
    {
      imgUrl: `${imgUrl}화남_1.png`,
      grade: 1,
      id: "화남1",
    },
  ];

  const [emotionList, setEmotionList] = useState<EmotionType[]>(emotionArr);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(
    emotionList[2]
  );
  const today = new Date();
  const diaryContent = useRef<any>("");
  const diaryTitle = useRef<any>("");

  const selectEmotion = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const submitAddDiary = () => {
    const diaryData = {
      diaryTitle: diaryTitle.current.value,
      diaryContent: diaryContent.current.value,
      emotionStatus: selectedEmotion,
      diaryDate: today.toLocaleString().slice(0, 12),
    };

    if (diaryData.diaryContent === "" || diaryData.diaryTitle === "") return;

    const localItem = localStorage.getItem("myDiaryList") as string;
    let diaryList = JSON.parse(localItem) as any;
    if (diaryList === null) diaryList = [];
    diaryList.push(diaryData);
    const parseSting = JSON.stringify(diaryList) as string;
    localStorage.setItem("myDiaryList", parseSting);
    diaryContent.current.value = "";
    diaryTitle.current.value = "";
  };

  return (
    <DiaryContainer>
      <div>소중한 나의 감정기록 작성하기</div>

      <EmotionTitle>오늘의 나의 기분은 어떤가요?</EmotionTitle>

      <ul>
        {emotionList?.map((emotion: EmotionType) => {
          return (
            <>
              <Emotion
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
