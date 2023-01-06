import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  findItemIndex,
  getCommentData,
  getLocalStorageData,
} from "../utils/storage";
import styled from "styled-components";
import { DiaryCommentType, DiaryType } from "../type/DiaryType";
import DiaryDetailContent from "../component/diaryDetail/DiaryDetailContent";
import DiaryComment from "../component/diaryDetail/DiaryComment";
import { createId } from "../utils/createId";
import { DIARY_KEY } from "../common/string";
import DiaryCommentList from "../component/diaryDetail/DiaryCommentList";
import { Home } from "../router/routerPath";

const DiaryDetailContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = {
    diaryTitle: "",
    diaryContent: "",
    emotionStatus: { imgUrl: "", grade: 0, id: "string" },
    diaryDate: "",
    diaryId: "",
    commentData: [],
  };
  const [diaryData, setDiaryData] = useState<DiaryType>(data);
  const [commentList, setCommentList] = useState<DiaryCommentType[]>([]);
  const commentRef = useRef<any>("");

  useEffect(() => {
    if (!id) return;

    const localDiaryData = getLocalStorageData(DIARY_KEY);
    const findIndex = findItemIndex(localDiaryData, id);

    if (findIndex === -1) {
      goToMainPage();
      return;
    }

    const detailDiary = findDiary();
    setDiaryData(detailDiary);
    setCommentList(detailDiary.commentData);
  }, []);

  const goToMainPage = () => navigate(Home);

  const addComment = () => {
    if (!id) return;

    const commentData: DiaryCommentType = {
      commentId: createId(),
      commentContent: commentRef.current.value,
    };

    getCommentData(commentData, id);
    setCommentList([...commentList, commentData]);
    commentRef.current.value = "";
  };

  const findDiary = () => {
    const diaryData = getLocalStorageData(DIARY_KEY);
    const detailDiary = diaryData.filter((diary) => diary.diaryId === id)[0];
    return detailDiary;
  };

  return (
    <DetailContainer>
      <DetailWrap>
        <DiaryDetailContent diaryData={diaryData} goToMainPage={goToMainPage} />
        <DiaryComment
          commentRef={commentRef}
          addComment={addComment}
          goToMainPage={goToMainPage}
        />
        {commentList.map((comment) => (
          <DiaryCommentList
            commentList={commentList}
            comment={comment}
            setCommentList={setCommentList}
            id={id}
          />
        ))}
      </DetailWrap>
    </DetailContainer>
  );
};

const DetailWrap = styled.div`
  background-color: #f9f9f9;
  width: 700px;
  height: 100vh;
  text-align: center;
  margin: auto;
`;

const DetailContainer = styled.div`
  height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: #bfcbdc;
  text-align: center;
`;

export default DiaryDetailContainer;
