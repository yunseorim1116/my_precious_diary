import Button from "../component/share/Button";
import { useNavigate } from "react-router-dom";
import { AddDiary, DiaryList } from "../router/routerPath";
import styled from "styled-components";
const MainContainer = () => {
  const navigate = useNavigate();

  const addDiary = () => {
    navigate(AddDiary);
  };
  const showDiaryList = () => {
    navigate(DiaryList);
  };

  return (
    <MainPageContainer>
      <MainWrap>
        <TitleImg src="/assets/img/소나기.png"></TitleImg>

        <div>
          <Button text="일기쓰러가기" clickFunction={addDiary}></Button>
        </div>
        <Button text="나의 기록 보기" clickFunction={showDiaryList}></Button>
      </MainWrap>
    </MainPageContainer>
  );
};

const TitleImg = styled.img`
  width: 400px;
  margin: 40px 0px;
`;
const MainWrap = styled.div`
  background-color: #f9f9f9;
  width: 700px;
  height: 100vh;
  text-align: center;
  margin: auto;
`;
const MainPageContainer = styled.div`
  background-color: #bfcbdc;
  width: 100vw;
  height: auto;
  text-align: center;
`;

export default MainContainer;
