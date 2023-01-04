import styled from "styled-components";

const DiaryComment = ({ commentRef, addComment }: any) => {
  return (
    <CommentWrap>
      <CommentInput
        placeholder="댓글을 입력하세요!"
        ref={commentRef}
      ></CommentInput>
      <Button onClick={addComment}>등록</Button>
    </CommentWrap>
  );
};

const CommentWrap = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
const CommentInput = styled.input`
  font-size: 14px;
  font-family: "GangwonEdu_OTFBoldA";
  border-radius: 22px;
  padding: 15px 10px;
  margin-left: 15px;
  border: none;
  &:focus {
    outline: none;
  }
  width: 80%;
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
export default DiaryComment;
