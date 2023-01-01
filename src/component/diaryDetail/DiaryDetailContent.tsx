import { DiaryType } from "../../type/DiaryType";
interface PropsType {
  diaryData: DiaryType;
}
const DiaryDetailContent = ({ diaryData }: PropsType) => {
  return (
    <>
      <div>{diaryData.diaryTitle}</div>
      <div>{diaryData.diaryContent}</div>
    </>
  );
};

export default DiaryDetailContent;
