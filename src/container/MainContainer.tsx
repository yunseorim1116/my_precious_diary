import Button from "../component/share/Button";
import { useNavigate } from "react-router-dom";
import { AddDiary, DiaryList } from "../router/routerPath";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";

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
        <Audio>
          <ReactAudioPlayer
            src="/music/RAIN-SOUNDS-1H_2.ogg"
            autoPlay
            controls
          />
        </Audio>
        <TitleImg src="/assets/img/소나기.png" />
        <div>
          <Button text="일기쓰러가기" clickFunction={addDiary} />
        </div>
        <Button text="나의 기록 보기" clickFunction={showDiaryList} />
      </MainWrap>
    </MainPageContainer>
  );
};

const Audio = styled.div`
  padding-top: 10px;
`;

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
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const MainPageContainer = styled.div`
  background-color: #bfcbdc;
  width: 100vw;
  height: 100vh;
  text-align: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MainContainer;
