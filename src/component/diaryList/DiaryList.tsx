import { useNavigate } from "react-router";
import styled from "styled-components";
import { DiaryDetail } from "../../router/routerPath";
import { DiaryType } from "../../type/DiaryType";
import DiaryEmotion from "../share/DiaryEmotion";

interface propsType {
  diary: DiaryType;
}
const DiaryList = ({ diary }: propsType) => {
  const { emotionStatus, diaryTitle, diaryDate, diaryContent, diaryId } = diary;
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`${DiaryDetail}${diaryId}`);
  };

  return (
    <DiaryListContainer onClick={goToDetailPage}>
      <DiaryEmotion emotion={emotionStatus}></DiaryEmotion>
      <span>
        <div>
          <TitleWarp>
            <Title>{diaryTitle}</Title>
            <DiaryDate>{diaryDate.allDateStr}</DiaryDate>
          </TitleWarp>
          <DiaryContent>{diaryContent}</DiaryContent>
        </div>
      </span>
    </DiaryListContainer>
  );
};

const DiaryDate = styled.div`
  color: #c5c5c5;
  margin-right: 15px;
`;

const DiaryContent = styled.div`
  text-align: left;
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Title = styled.div`
  text-align: left;
  width: 400px;
  font-family: "FlowerSalt";
  font-size: 28px;
  margin-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
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
