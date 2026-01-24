import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Progress } from "../Progress";

export const InteractiveExample = () => {
  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="caption-1">Determinate with Value</Typography>
        <Progress value={45} showValue />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">Indeterminate (Loading)</Typography>
        <Progress />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">Circle with Value</Typography>
        <Progress variant="circle" value={85} showValue />
      </Flex>
    </Flex>
  );
};
