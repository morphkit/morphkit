import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Divider } from "../Divider";

export const OrientationsExample = () => {
  return (
    <Flex gap="md">
      <Flex gap="sm">
        <Typography variant="caption-1">Horizontal (default)</Typography>
        <Divider />
      </Flex>
      <Flex
        gap="sm"
        direction="horizontal"
        align="center"
        style={{ height: 40 }}
      >
        <Typography variant="caption-1">Vertical</Typography>
        <Divider orientation="vertical" />
      </Flex>
    </Flex>
  );
};
