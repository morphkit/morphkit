import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Progress } from "../Progress";

export const SizesExample = () => {
  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="caption-1">Bar Sizes</Typography>
        <Flex gap="md">
          <Flex gap="xs">
            <Typography variant="caption-2">Small (4px)</Typography>
            <Progress size="sm" value={60} />
          </Flex>
          <Flex gap="xs">
            <Typography variant="caption-2">Medium (8px)</Typography>
            <Progress size="md" value={60} />
          </Flex>
          <Flex gap="xs">
            <Typography variant="caption-2">Large (12px)</Typography>
            <Progress size="lg" value={60} />
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="sm">
        <Typography variant="caption-1">Circle Sizes</Typography>
        <Flex direction="horizontal" gap="lg">
          <Flex gap="xs" style={{ alignItems: "center" }}>
            <Progress variant="circle" size="sm" value={60} />
            <Typography variant="caption-2">32px</Typography>
          </Flex>
          <Flex gap="xs" style={{ alignItems: "center" }}>
            <Progress variant="circle" size="md" value={60} />
            <Typography variant="caption-2">48px</Typography>
          </Flex>
          <Flex gap="xs" style={{ alignItems: "center" }}>
            <Progress variant="circle" size="lg" value={60} />
            <Typography variant="caption-2">64px</Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
