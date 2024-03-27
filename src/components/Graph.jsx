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
        date: "Feb 14",
        stars: 100,
      },
      {
        date: "Feb 15",
        stars: 105,
      },
      {
        date: "Feb 16",
        stars: 140,
      },
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
    <div className="h-[78%] sm:h-[85%]">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          
        }}
      />
    </div>
  );
};

export default Graph;
