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
import { Home, DiaryList } from "../router/routerPath";
import { diaryDataObj } from "../common/obj";
import { calculateTime } from "../utils/calculateTime";

const DiaryDetailContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [diaryData, setDiaryData] = useState<DiaryType>(diaryDataObj);
  const [commentList, setCommentList] = useState<DiaryCommentType[]>([]);
  const commentRef = useRef<any>("");

  useEffect(() => {
    if (!id) return;

    const localDiaryData = getLocalStorageData(DIARY_KEY);
    const findIndex = findItemIndex(localDiaryData, id);

    if (findIndex === -1) {
      goToMainPage(); //삭제됐을때
      return;
    }

    const detailDiary = findDiary();
    setDiaryData(detailDiary);
    setCommentList(detailDiary.commentData);
  }, []);

  const goToMainPage = () => navigate(Home);
  const goToListPage = () => navigate(DiaryList);

  const addComment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!commentRef.current.value) return;
    if (!id) return;

    const commentData: DiaryCommentType = {
      commentId: createId(),
      commentContent: commentRef.current.value,
      commentDate: calculateTime().allDateStr,
    };

    getCommentData(commentData, id);
    setCommentList([...commentList, commentData]);
    commentRef.current.value = "";

    setTimeout(() => {
      window.scrollTo(0, 10000);
    }, 100);
  };

  const findDiary = () => {
    const diaryData = getLocalStorageData(DIARY_KEY);
    const detailDiary = diaryData.filter((diary) => diary.diaryId === id)[0];
    return detailDiary;
  };

  return (
    <DetailContainer>
      <DetailWrap>
        <DiaryDetailContent diaryData={diaryData} goToListPage={goToListPage} />
        <DiaryComment commentRef={commentRef} addComment={addComment} />
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
  text-align: center;
`;

export default DiaryDetailContainer;
