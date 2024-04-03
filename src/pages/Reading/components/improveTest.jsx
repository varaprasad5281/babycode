import ImproveTestCard from "./improveTestCard";
import "./index.css";
import data from "./readingBooks.json";

const ImproveTest = () => {
  return (
    <>
      {data.map((e) => (
        <ImproveTestCard item={e} />
      ))}
    </>
  );
};

export default ImproveTest;
