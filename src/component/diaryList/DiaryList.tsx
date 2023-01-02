import { useNavigate } from "react-router";
import styled from "styled-components";
import { DiaryDetail } from "../../router/routerPath";
import { DiaryType } from "../../type/DiaryType";
import DiaryEmotion from "../share/DiaryEmotion";

interface propsType {
  diary: DiaryType;
}
const DiaryList = ({ diary }: propsType) => {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`${DiaryDetail}${diary.diaryId}`);
  };

  return (
    <DiaryListContainer onClick={goToDetailPage}>
      <DiaryEmotion emotion={diary.emotionStatus}></DiaryEmotion>
      <DiaryContentWrap>
        <div>
          <TitleWarp>
            <Title>{diary.diaryTitle}</Title>
            <div>{diary.diaryDate}</div>
          </TitleWarp>
          <DiaryContent>{diary.diaryContent}</DiaryContent>
        </div>
      </DiaryContentWrap>
    </DiaryListContainer>
  );
};

const DiaryContent = styled.div`
  text-align: left;
`;

const DiaryContentWrap = styled.span`
  padding: 20px;
`;

const Title = styled.div`
  font-family: "FlowerSalt";
  font-size: 28px;
`;
const TitleWarp = styled.div`
  margin-bottom: 10px;
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

const DiaryListContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 20px;
`;
export default DiaryList;
