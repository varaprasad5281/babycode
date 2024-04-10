import ImproveTestCard from "./improveTestCard";
import "./index.css";
import data from "./readingBooks.json";
import ReadingPractice from "./readingPractice";

const ImproveTest = ({ materials }) => {
  console.log(materials);
  return (
    <>
      {materials.map((e) => (
        <ReadingPractice key={e.uniqueTestNumber} item={e} />
      ))}
    </>
  );
};

export default ImproveTest;
