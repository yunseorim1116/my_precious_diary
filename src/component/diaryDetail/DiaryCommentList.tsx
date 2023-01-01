import React, { useEffect } from "react";
import { DiaryCommentType } from "../../type/DiaryType";
import { getLocalStorage, setCommentData } from "../../utils/storage";

import styled from "styled-components";
import { DIARY_KEY } from "../../common/string";
const DiaryCommentList = ({
  commentList,
  comment,
  setCommentList,
  findDiary,
  id,
}: any) => {
  const onDelete = () => {
    const newCommentList = commentList.filter(
      (item: DiaryCommentType) => item.commentId !== comment.commentId
    );

    setCommentList(newCommentList); //화면에서 삭제

    const localDiaryData = getLocalStorage(DIARY_KEY);
    const findIndex = localDiaryData.findIndex((item) => item.diaryId === id);
    const findCommentIndex = localDiaryData[findIndex].commentData.findIndex(
      (item) => comment.commentId === item.commentId
    );

    localDiaryData[findIndex].commentData.splice(findCommentIndex, 1); //로컬스토리지 코멘트 삭제
    setCommentData(localDiaryData);
  };
  return (
    <CommentContainer>
      <div>{comment.commentContent}</div>
      <button onClick={onDelete}>삭ㅈㅔ</button>
    </CommentContainer>
  );
};
const CommentContainer = styled.div`
  display: flex;
  cursor: printer;
`;

export default DiaryCommentList;
