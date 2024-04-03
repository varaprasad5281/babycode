import "./index.css";
import data from "./reading.json";
import ReadingTestCard from "./readingTestCard";

const ReadingTest = () => {
  return (
    <>
      {data.map((e) => (
        <ReadingTestCard item={e} />
      ))}
    </>
  );
};

export default ReadingTest;
