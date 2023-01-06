import { DiaryType } from "../../type/DiaryType";
import styled from "styled-components";
import { AddDiary, Home } from "../../router/routerPath";
import { useNavigate } from "react-router";
import { getLocalStorageData, findItemIndex } from "../../utils/storage";
import { DIARY_KEY } from "../../common/string";
import { useState } from "react";
import DiaryEmotion from "../share/DiaryEmotion";

interface PropsType {
  diaryData: DiaryType;
  goToMainPage: () => void;
}

const DiaryDetailContent = ({ diaryData, goToMainPage }: PropsType) => {
  const [isClickButton, setIsClickButton] = useState(false);
  const navigate = useNavigate();
  const { emotionStatus, diaryTitle, diaryContent, diaryId, diaryDate } =
    diaryData;

  const onToggleButton = () => {
    setIsClickButton(!isClickButton);
  };

  const onDeleteDiary = () => {
    const localDiaryData = getLocalStorageData(DIARY_KEY);
    const findIndex = findItemIndex(localDiaryData, diaryId);
    localDiaryData.splice(findIndex, 1);
    const parseSting = JSON.stringify(localDiaryData) as string;
    localStorage.setItem(DIARY_KEY, parseSting);
    goToMainPage();
  };

  const onEditDiary = () => {
    const diaryDataObj = {
      id: diaryId,
      emotionStatus: emotionStatus,
      diaryTitle: diaryTitle,
      diaryContent: diaryContent,
    };
    navigate(AddDiary, {
      state: {
        diaryDataObj,
      },
    });
  };

  return (
    <ContentWrap>
      <Header>
        <IconImg
          src="/assets/icon/back_arrow_icon.png"
          onClick={goToMainPage}
        />
        <IconImg src="/assets/icon/kebab.png" onClick={onToggleButton} />
      </Header>
      {isClickButton && (
        <DiaryWrap>
          <ModifyButtonBox>
            <ModifyButton onClick={onEditDiary}>수정</ModifyButton>
            <ModifyButton onClick={onDeleteDiary}>삭제</ModifyButton>
          </ModifyButtonBox>
        </DiaryWrap>
      )}

      <ContentBox>
        <DiaryEmotion emotion={diaryData.emotionStatus}></DiaryEmotion>
        <DiaryTitle>{diaryTitle}</DiaryTitle>
        <DirayDate>{diaryDate.dateYearMonthStr}</DirayDate>
        <Content>{diaryContent}</Content>
      </ContentBox>
    </ContentWrap>
  );
};

const ContentBox = styled.div`
  padding: 0px 20px;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 18px;
  padding: 20px;
  height: 300px;
  text-align: left;
  font-size: 18px;
`;

const DirayDate = styled.div`
  margin-bottom: 30px;
  text-align: right;
  padding-right: 10px;
  color: #adabab;
`;

const ContentWrap = styled.div`
  font-family: "GangwonEdu_OTFBoldA";
  width: 700px;
`;

const DiaryWrap = styled.div`
  position: absolute;
  top: 45px;
  right: 420px;
`;

const ModifyButton = styled.div`
  width: 80px;
  &:hover {
    background-color: #cad0d2;
    font-weight: 800;
    color: white;
    border-radius: 4px;
  }
  cursor: pointer;
  padding: 10px;
  color: #575757;
`;

const ModifyButtonBox = styled.div`
  font-weight: 800;
  border-radius: 4px;
  color: #e0e0e0;
  box-shadow: 5px 5px 20px;
`;

const Header = styled.div`
  max-width: 700px;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
`;

const IconImg = styled.img`
  cursor: pointer;
  width: 35px;
`;

const DiaryTitle = styled.p`
  font-family: "FlowerSalt";
  font-weight: 600;
  padding: 15px;
  font-size: 35px;
`;
export default DiaryDetailContent;
