const Emotion = () => {
  const emotionList = ["감정1", "감정2", "감정3", "감정4", "감정5"];
  return (
    <>
      {emotionList.map((emotion) => (
        <span>{emotion}</span>
      ))}
    </>
  );
};

export default Emotion;
