import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Progress } from "../Progress";

export const VariantsExample = () => {
  return (
    <Flex gap="md">
      <Flex gap="sm">
        <Typography variant="caption-1">Bar (default)</Typography>
        <Progress variant="bar" value={75} />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">Circle</Typography>
        <Progress variant="circle" value={75} />
      </Flex>
    </Flex>
  );
};
