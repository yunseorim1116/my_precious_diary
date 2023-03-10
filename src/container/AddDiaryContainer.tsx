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
import ModalPortal from "../PortalModal";
import { Modal } from "../component/share/Modal";

const AddDiaryContainer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const [emotionList, setEmotionList] = useState<EmotionType[]>(emotionArr);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(
    emotionList[2]
  );

  const text = "내용을 입력해주세요!";

  useEffect(() => {
    if (!state) return;

    const { diaryDataObj } = state;
    setSelectedEmotion(diaryDataObj.emotionStatus);
    setIsEdit(true);

    const diaryContents = diaryContent.current!;
    diaryContents.value = diaryDataObj.diaryContent;

    const diaryTitles = diaryTitle.current!;
    diaryTitles.value = diaryDataObj.diaryTitle;
  }, []);

  const diaryContent = useRef<HTMLTextAreaElement>(null);
  const diaryTitle = useRef<HTMLInputElement>(null);

  const selectEmotion = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const showAlert = () => {
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 800);
  };

  const submitAddDiary = () => {
    const dateTime = calculateTime();
    const diaryId = createId();

    const diaryContents = diaryContent.current!;
    const diaryTitles = diaryTitle.current!;

    if (diaryContents.value === "" || diaryTitles.value === "") {
      showAlert();
      return;
    }

    const diaryData: DiaryType = {
      diaryTitle: diaryTitles.value,
      diaryContent: diaryContents.value,
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
      diaryData.diaryDate = diaryDataObj.diaryDate;
      diaryData.commentData = diaryDataObj.commentData;

      const localDiaryData = getLocalStorageData(DIARY_KEY);
      const findIndex = localDiaryData.findIndex(
        (item) => item.diaryId === diaryDataObj.id
      );

      localDiaryData[findIndex] = diaryData;
      const parseSting = JSON.stringify(localDiaryData) as string;
      localStorage.setItem(DIARY_KEY, parseSting);
    } else setDiaryData(diaryData);

    navigate(DiaryList);
  };

  return (
    <DiaryContainer>
      <DiaryWrap>
        <EmotionWrap>
          <EmotionTitle>오늘의 나의 기분은 어떤가요?</EmotionTitle>
          <ModalPortal>{modalOpen && <Modal text={text} />}</ModalPortal>
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
  width: 100vw;
  align-items: center;
`;

const DiaryContentWrap = styled.div`
  margin: 0px 30px;
`;

const DiaryContent = styled.textarea`
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 18px;
  padding: 20px 10px;
  display: block;
  background-color: #f9f9f9;
  border: none;
  &:focus {
    outline: none;
  }
  width: 600px;
  height: 300px;
`;

const EmotionTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
  padding: 25px 0px;
`;
