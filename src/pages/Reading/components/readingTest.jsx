import "./index.css";
import data from "./reading.json";
import ReadingTestCard from "./readingTestCard";

const ReadingTest = ({ tests, attendedTests, getData }) => {
  const filteredAttendedTests =
    tests?.filter((test) => attendedTests.includes(test.uniqueTestNumber)) ||
    [];

  const lastAttendedTest = filteredAttendedTests.length
    ? filteredAttendedTests.sort((item1, item2) => item1.id < item2.id)[0]
    : {};
  return (
    <>
      {tests.length > 0 &&
        tests.map((test, i) => (
          <ReadingTestCard
            key={test.id}
            test={test}
            attendedTests={attendedTests}
            lastAttendedTest={lastAttendedTest}
            getData={getData}
          />
        ))}
    </>
  );
};

export default ReadingTest;
