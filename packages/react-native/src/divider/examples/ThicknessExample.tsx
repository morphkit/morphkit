import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Divider } from "../Divider";

export const ThicknessExample = () => {
  return (
    <Flex gap="md">
      <Flex gap="sm">
        <Typography variant="caption-1">Hairline (default)</Typography>
        <Divider />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">2px thickness</Typography>
        <Divider thickness={2} />
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">4px thickness</Typography>
        <Divider thickness={4} />
      </Flex>
    </Flex>
  );
};
