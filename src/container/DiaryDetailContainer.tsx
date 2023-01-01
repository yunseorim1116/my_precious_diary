import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getCommentData, getLocalStorage } from "../utils/storage";
import { DiaryCommentType, DiaryType } from "../type/DiaryType";
import DiaryDetailContent from "../component/diaryDetail/DiaryDetailContent";
import DiaryComment from "../component/diaryDetail/DiaryComment";
import { createId } from "../utils/createId";
import { DIARY_KEY } from "../common/string";
import DiaryCommentList from "../component/diaryDetail/DiaryCommentList";

const DiaryDetailContainer = () => {
  const { id } = useParams();
  const [diaryData, setDiaryData] = useState<DiaryType>();
  const [commentList, setCommentList] = useState<DiaryCommentType[]>([]);
  const commentRef = useRef<any>("");

  const addComment = () => {
    if (!id) return;
    if (!commentRef.current.value) return;

    const commentData: DiaryCommentType = {
      commentId: createId(),
      commentContent: commentRef.current.value,
    };
    getCommentData(commentData, id);
    setCommentList([...commentList, commentData]);
  };

  const findDiary = () => {
    const diaryData = getLocalStorage();
    const detailDiary = diaryData.filter((diary) => diary.diaryId === id)[0];
    return detailDiary;
  };

  useEffect(() => {
    const detailDiary = findDiary();
    setDiaryData(detailDiary);
    setCommentList(detailDiary.commentData);
  }, []);

  return (
    <>
      {diaryData && <DiaryDetailContent diaryData={diaryData} />}
      <div>ㅎㅇ</div>
      <DiaryComment commentRef={commentRef} addComment={addComment} />
      {commentList?.map((comment) => (
        <DiaryCommentList
          findDiary={findDiary}
          commentList={commentList}
          comment={comment}
          setCommentList={setCommentList}
          id={id}
        />
      ))}
    </>
  );
};

export default DiaryDetailContainer;
