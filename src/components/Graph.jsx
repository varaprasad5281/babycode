import React from "react";
import { Chart } from "react-charts";

const data = [
  {
    label: "Progress",
    data: [
      {
        date: "Feb 12",
        stars: 0,
      },
      {
        date: "Feb 13",
        stars: 60,
      },
      {
        date: "Feb 15",
        stars: 105,
      },
      // {
      //   date: "Feb 16",
      //   stars: 124,
      // },
    ],
  },
];

const Graph = () => {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.stars,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.date,
        elementType: "line",
      },
    ],
    []
  );
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl mb-4 font-medium md:hidden">Your Progress Summary</h3>
      <div className="hidden md:inline-block bg-[#FEF9E5] font-medium p-2 rounded-lg mb-4 w-[95%]">
        <span className="text-sky-500">Wow! </span>
        <span>You{"'"}re about to reach your targeted band</span>
      </div>
      <div className="w-[90%] h-full">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
      </div>
      <div className="inline-block md:hidden bg-[#FEF9E5] font-medium p-2 rounded-lg mt-4">
        <span className="text-sky-500">Wow! </span>
        <span>You{"'"}re about to reach your targeted band</span>
      </div>
    </div>
  );
};

export default Graph;
