import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Label } from "../Label";

export const SizesExample = () => {
  return (
    <Flex gap="lg">
      <Flex gap="xs">
        <Typography variant="caption-1">
          Default Size (callout variant)
        </Typography>
        <Label>Email address</Label>
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">With Required Indicator</Typography>
        <Label required>Password</Label>
      </Flex>
    </Flex>
  );
};
