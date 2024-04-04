import React from "react";
import ListeningTestItem from "./ListeningTestItem";

const ListeningTests = ({ tests, attendedTests }) => {
  const filteredAttendedTests = tests.filter((test) =>
    attendedTests.includes(test.uniqueTestNumber)
  );

  const lastAttendedTest = filteredAttendedTests.sort(
    (item1, item2) => item1.id < item2.id
  )[0];

  return (
    <div className="flex flex-col gap-3 px-6 lg:px-[3rem]">
      {tests.length > 0 &&
        tests.map((test, idx) => (
          <ListeningTestItem
            key={test.id}
            test={test}
            attendedTests={attendedTests}
            lastAttendedTest={lastAttendedTest}
          />
        ))}
    </div>
  );
};

export default ListeningTests;
