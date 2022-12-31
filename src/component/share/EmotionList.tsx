import styled from "styled-components";
interface propsType {
  selectEmotion?: (e: any) => void;
}
const EmotionList = ({ selectEmotion }: propsType) => {
  const imgUrl = "/assets/img/";
  const emotionList = [
    `${imgUrl}매우좋음_5.png`,
    `${imgUrl}좋음_4.png`,
    `${imgUrl}무난_3.png`,
    `${imgUrl}슬픔_2.png`,
    `${imgUrl}화남_1.png`,
  ];
  return (
    <Li>
      {emotionList.map((emotion) => (
        <Ul>
          <EmotionItem onClick={selectEmotion} src={emotion} />
        </Ul>
      ))}
    </Li>
  );
};

const Ul = styled.ul`
  padding: 0px;
  display: inline-block;
  background-color: #d6d6d6;
  border-radius: 4px;
  width: 100px;
  height: 100px;
  margin-right: 15px;
`;
const Li = styled.li`
  list-style: none;
`;
const EmotionItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;
export default EmotionList;
