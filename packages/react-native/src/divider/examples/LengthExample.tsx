import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Divider } from "../Divider";

export const LengthExample = () => {
  return (
    <Flex gap="md">
      <Flex gap="sm">
        <Typography variant="caption-1">100% length (default)</Typography>
        <Divider />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">50% length</Typography>
        <Divider length="50%" />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">120px fixed length</Typography>
        <Divider length={120} />
      </Flex>
    </Flex>
  );
};
