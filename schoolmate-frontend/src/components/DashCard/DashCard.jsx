import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import React from "react";

const DashCard = ({ title, icon, color, count, tooltip }) => {
  return (
    <Card className="max-w-full">
      <div className="space-x-6 flex">
        <Icon
          className="px-4"
          icon={icon}
          color={color}
          variant="solid"
          tooltip={tooltip}
          size="lg"
        />
        <div className="flex flex-col gap-2">
          <Text>{title}</Text>
          <Metric>{count}</Metric>
        </div>
      </div>
    </Card>
  );
};

export default DashCard;
