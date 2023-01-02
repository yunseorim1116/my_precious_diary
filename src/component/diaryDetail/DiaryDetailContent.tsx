import { DiaryType } from "../../type/DiaryType";
import styled from "styled-components";
import { AddDiary, Home } from "../../router/routerPath";
import { useNavigate } from "react-router";
import { DiaryList } from "../../router/routerPath";
import { getLocalStorageData, findItemIndex } from "../../utils/storage";
import { DIARY_KEY } from "../../common/string";
import { useEffect } from "react";
interface PropsType {
  diaryData: DiaryType;
  goToMainPage: () => void;
}
const DiaryDetailContent = ({ diaryData, goToMainPage }: PropsType) => {
  const navigate = useNavigate();
  const { emotionStatus, diaryTitle, diaryContent, diaryId } = diaryData;

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
    <>
      <button>뒤로가기</button>
      <Title>{diaryTitle}</Title>
      <button onClick={onEditDiary}>수정하기</button>
      <button onClick={onDeleteDiary}>삭제</button>
      <div>{diaryContent}</div>
    </>
  );
};
const Title = styled.p`
  font-size: 25px;
  margin-bottom: 25px;
`;
export default DiaryDetailContent;
