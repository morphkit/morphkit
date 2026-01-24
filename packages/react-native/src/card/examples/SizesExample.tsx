import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Card } from "../Card";

export const SizesExample = () => {
  return (
    <Flex gap="md">
      <Card size="sm">
        <Typography variant="subhead">Small</Typography>
        <Typography variant="body">Compact padding</Typography>
      </Card>
      <Card size="md">
        <Typography variant="subhead">Medium</Typography>
        <Typography variant="body">Default padding</Typography>
      </Card>
      <Card size="lg">
        <Typography variant="subhead">Large</Typography>
        <Typography variant="body">Spacious padding</Typography>
      </Card>
    </Flex>
  );
};
