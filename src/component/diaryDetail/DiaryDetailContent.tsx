import { DiaryType } from "../../type/DiaryType";
import styled from "styled-components";
import { AddDiary } from "../../router/routerPath";

import { useNavigate } from "react-router";
import { DIARY_KEY, DIARY_DETAIL_KEY } from "../../common/string";
import { getLocalStorage } from "../../utils/storage";
interface PropsType {
  diaryData: DiaryType;
}
const DiaryDetailContent = ({ diaryData }: PropsType) => {
  const navigate = useNavigate();

  const onEditDiary = () => {
    const diaryDataObj = {
      id: diaryData.diaryId,
      emotionStatus: diaryData.emotionStatus,
      diaryTitle: diaryData.diaryTitle,
      diaryContent: diaryData.diaryContent,
    };
    navigate(AddDiary, {
      state: {
        diaryDataObj,
      },
    });
  };

  return (
    <>
      <Title>{diaryData.diaryTitle}</Title>
      <button onClick={onEditDiary}>수정하기</button>
      <div>{diaryData.diaryContent}</div>
    </>
  );
};
const Title = styled.p`
  font-size: 25px;
  margin-bottom: 25px;
`;
export default DiaryDetailContent;
