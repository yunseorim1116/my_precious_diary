import { DiaryCommentType } from "../../type/DiaryType";
import {
  getLocalStorageData,
  setLocalStorageData,
  findItemIndex,
} from "../../utils/storage";
import styled from "styled-components";
import { DIARY_KEY } from "../../common/string";

interface PropsType {
  commentList: DiaryCommentType[];
  comment: DiaryCommentType;
  setCommentList: React.Dispatch<React.SetStateAction<DiaryCommentType[]>>;
  id: string | undefined;
}

const DiaryCommentList = ({
  commentList,
  comment,
  setCommentList,
  id,
}: PropsType) => {
  const onDeleteComment = () => {
    if (!id) return;

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
      <div>
        <CommentDate>{comment.commentDate}</CommentDate>
        <Button onClick={onDeleteComment}>삭제</Button>
      </div>
    </CommentContainer>
  );
};

const CommentDate = styled.span`
  word-break: normal;
  margin-right: 18px;
  color: #c6c6c6;
`;

const CommentContent = styled.p`
  color: #4e4e4e;
  text-align: left;
  width: 600px;
  font-size: 16px;
  margin-left: 30px;
  font-family: "GangwonEdu_OTFBoldA";
  overflow: hidden;
  word-wrap: break-word;
`;

const Button = styled.button`
  margin-top: 8px;
  font-family: "FlowerSalt";
  white-space: nowrap;
  cursor: pointer;
  padding: 5px 20px;
  font-size: 18px;
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
  align-items: center;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-top: 10px;
`;

export default DiaryCommentList;
