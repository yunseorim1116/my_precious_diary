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
  const data = {
    diaryTitle: "",
    diaryContent: "",
    emotionStatus: { imgUrl: "", grade: 0, id: "string" },
    diaryDate: "",
    diaryId: "",
    commentData: [],
  };

  const { id } = useParams();
  const [diaryData, setDiaryData] = useState<DiaryType>(data);
  const [commentList, setCommentList] = useState<DiaryCommentType[]>([]);
  const commentRef = useRef<any>("");

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
    const diaryData = getLocalStorage(DIARY_KEY);

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
      {}

      <DiaryDetailContent diaryData={diaryData} />
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
