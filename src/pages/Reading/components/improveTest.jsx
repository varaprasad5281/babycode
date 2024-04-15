import "./index.css";
import ReadingPractice from "./readingPractice";

const ImproveTest = ({ materials }) => {
  return (
    <>
      {materials.map((e) => (
        <ReadingPractice key={e.uniqueTestNumber} item={e} />
      ))}
    </>
  );
};

export default ImproveTest;
