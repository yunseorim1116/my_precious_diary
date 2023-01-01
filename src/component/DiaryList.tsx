import styled from "styled-components";
import { DiaryType } from "../type/DiaryType";
import DiaryEmotion from "./DiaryEmotion";

interface propsType {
  diary: DiaryType;
}
const DiaryList = ({ diary }: propsType) => {
  return (
    <div>
      <DiaryEmotion emotion={diary.emotionStatus}></DiaryEmotion>
      <div>{diary.diaryTitle}</div>
      <div>{diary.diaryDate}</div>
      <div>{diary.diaryContent}</div>
    </div>
  );
};

export default DiaryList;
