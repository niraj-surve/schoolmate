import { AreaChart, Card, Title } from "@tremor/react";

const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">{category.value}</p>  
          </div>
        </div>
      ))}
    </div>
  );
};

export const CustomAreaChart = ({title, data, categories}) => {
  return (
    <>
      <Card>
        <Title>{title}</Title>
        <AreaChart
          className="h-72 mt-4"
          data={data}
          index="date"
          showAnimation="true"
          categories={categories}
          colors={["blue"]}
          yAxisWidth={30}
          customTooltip={customTooltip}
        />
      </Card>
    </>
  );
};