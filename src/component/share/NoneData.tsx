import styled from "styled-components";
const NoneData = () => {
  return (
    <NoneWrap>
      <NoneContent>작성된 일기가 없어요!</NoneContent>
    </NoneWrap>
  );
};
const NoneContent = styled.div`
  color: #acacac;
`;

const NoneWrap = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default NoneData;
