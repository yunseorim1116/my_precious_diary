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
            <DiaryDate>{diary.diaryDate.allDateStr}</DiaryDate>
          </TitleWarp>
          <DiaryContent>{diary.diaryContent}</DiaryContent>
        </div>
      </DiaryContentWrap>
    </DiaryListContainer>
  );
};

const DiaryDate = styled.div`
  color: #c5c5c5;
  margin-right: 15px;
`;

const DiaryContent = styled.div`
  text-align: left;
`;

const DiaryContentWrap = styled.span``;

const Title = styled.div`
  font-family: "FlowerSalt";
  font-size: 28px;
  margin-top: 15px;
`;

const TitleWarp = styled.div`
  margin-bottom: 10px;
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

const DiaryListContainer = styled.div`
  border-radius: 18px;
  margin: 10px 0px;
  padding: 20px 0px;
  background-color: #ffffff;
  display: flex;
`;
export default DiaryList;
