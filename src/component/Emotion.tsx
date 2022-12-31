import { useEffect, useState } from "react";
import styled from "styled-components";
import { EmotionType } from "../type/EmotionType";
interface propsType {
  emotion: EmotionType;
  selectEmotion: (emotion: EmotionType) => void;
  selectedEmotion: EmotionType;
}
const Emotion = ({ emotion, selectEmotion, selectedEmotion }: propsType) => {
  return (
    <Ul selectedEmotion={selectedEmotion} emotion={emotion}>
      <EmotionItem
        onClick={() => {
          selectEmotion(emotion);
        }}
        src={emotion.imgUrl}
      />
    </Ul>
  );
};

interface EmotionBackType {
  selectedEmotion: any;
  emotion: EmotionType;
}
const Ul = styled.ul<EmotionBackType>`
  padding: 0px;
  color: #89a0aa;
  display: inline-block;
  background-color: ${(props) =>
    props.emotion === props.selectedEmotion ? "#89a0aa" : "#dddddd"};
  border-radius: 4px;
  width: 100px;
  height: 100px;
  margin-right: 15px;
`;
const EmotionItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;
export default Emotion;
