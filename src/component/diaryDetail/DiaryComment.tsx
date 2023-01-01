import React from "react";

const DiaryComment = ({ commentRef, addComment }: any) => {
  return (
    <>
      <input placeholder="댓글입력하시긔" ref={commentRef}></input>
      <button onClick={addComment}>등록하기</button>
    </>
  );
};

export default DiaryComment;
