import { Box } from "../../box";
import { Stack } from "../../stack";
import { Skeleton } from "../Skeleton";

export const ContentPlaceholderExample = () => {
  return (
    <Box>
      <Stack direction="horizontal" gap="md" align="center">
        <Skeleton variant="circle" width={48} height={48} />
        <Stack gap="sm" style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Stack>
      </Stack>
    </Box>
  );
};
