import { Box } from "../../box";
import { Typography } from "../../typography";
import { FAB } from "../FAB";

export const BasicExample = () => {
  return (
    <Box style={{ height: 120, position: "relative" }}>
      <FAB
        icon={<Typography variant="body">+</Typography>}
        onPress={() => {}}
      />
    </Box>
  );
};
