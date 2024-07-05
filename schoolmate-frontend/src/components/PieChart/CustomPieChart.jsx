import { Card, DonutChart, Legend, Title } from "@tremor/react";
import React from "react";

export const CustomPieChart = ({ title, data, category, dataKey, valueFormatter }) => {
  const legendLabels = data.map((item) => item[dataKey]);

  return (
    <>
      <Card className="max-w-lg">
        <Title>{title}</Title>
        <DonutChart
          variant="pie"
          showLabel="true"
          showAnimation="true"
          className="mt-6"
          data={data}
          category={category}
          index={dataKey}
          valueFormatter={valueFormatter}
          colors={["violet", "indigo", "rose"]}
        />
        <div className="flex mt-3 justify-between">
          <Legend
            className="flex"
            categories={legendLabels}
            colors={["violet", "indigo", "rose"]}
          />
        </div>
      </Card>
    </>
  );
};
