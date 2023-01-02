import React, { useEffect } from "react";
import { DiaryCommentType } from "../../type/DiaryType";
import {
  getLocalStorageData,
  setLocalStorageData,
  findItemIndex,
} from "../../utils/storage";
import styled from "styled-components";
import { DIARY_KEY } from "../../common/string";
const DiaryCommentList = ({
  commentList,
  comment,
  setCommentList,
  id,
}: any) => {
  const onDelete = () => {
    const newCommentList = commentList.filter(
      (item: DiaryCommentType) => item.commentId !== comment.commentId
    );

    setCommentList(newCommentList); //화면에서 삭제

    const localDiaryData = getLocalStorageData(DIARY_KEY);
    const findIndex = findItemIndex(localDiaryData, id);
    const findCommentIndex = localDiaryData[findIndex].commentData.findIndex(
      (item) => comment.commentId === item.commentId
    );

    localDiaryData[findIndex].commentData.splice(findCommentIndex, 1); //로컬스토리지 코멘트 삭제
    setLocalStorageData(DIARY_KEY, localDiaryData);
  };
  return (
    <CommentContainer>
      <CommentContent>{comment.commentContent}</CommentContent>
      <Button onClick={onDelete}>삭ㅈㅔ</Button>
    </CommentContainer>
  );
};

const CommentContent = styled.div`
  font-size: 18px;
  margin-left: 20px;
  align-items: center;
  display: flex;
  font-family: "GangwonEdu_OTFBoldA";
`;
const Button = styled.button`
  font-family: "FlowerSalt";
  cursor: pointer;
  padding: 4px 20px;
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: auto;
  border: none;
  border-radius: 22px;
  color: #746b6b;
  margin-right: 15px;
`;
const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: printer;
  margin-top: 30px;
`;

export default DiaryCommentList;
