import Button from "../component/share/Button";
import { useNavigate } from "react-router-dom";
import { AddDiary, DiaryList } from "../router/routerPath";
const MainContainer = () => {
  const navigate = useNavigate();

  const addDiary = () => {
    navigate(AddDiary);
  };
  const showDiaryList = () => {
    navigate(DiaryList);
  };

  return (
    <>
      <p>소중한 나의 감정 기록장</p>
      <Button text="일기쓰러가기" clickFunction={addDiary}></Button>
      <Button text="나의 기록 보기" clickFunction={showDiaryList}></Button>
    </>
  );
};

export default MainContainer;
