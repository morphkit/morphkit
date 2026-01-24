import { Box } from "../../box";
import { Flex } from "../../flex";
import { Skeleton } from "../Skeleton";

export const ContentPlaceholderExample = () => {
  return (
    <Box>
      <Flex direction="horizontal" gap="md" align="center">
        <Skeleton variant="circle" width={48} height={48} />
        <Flex gap="sm" style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Flex>
      </Flex>
    </Box>
  );
};
