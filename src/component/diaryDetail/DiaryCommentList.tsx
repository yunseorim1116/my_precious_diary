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


   
        <CommentDate>{comment.commentDate}</CommentDate>
        <Button onClick={onDeleteComment}>삭제</Button>
   
    </CommentContainer>
  );
};

const CommentDate = styled.span`
  margin-right: 18px;
  color: #c6c6c6;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentContent = styled.div`
  font-size: 18px;
  margin-left: 30px;
  font-family: "GangwonEdu_OTFBoldA";
`;

const Button = styled.button`
  font-family: "FlowerSalt";
  cursor: pointer;
  padding: 5px 20px;
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
  align-items: center;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px 0px;
`;

export default DiaryCommentList;
