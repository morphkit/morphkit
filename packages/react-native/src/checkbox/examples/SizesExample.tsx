import { useState } from "react";
import { Stack, Typography } from "../..";
import { Checkbox } from "../Checkbox";

export const SizesExample = () => {
  const [small, setSmall] = useState(true);
  const [medium, setMedium] = useState(true);
  const [large, setLarge] = useState(true);

  return (
    <Stack gap="md">
      <Checkbox checked={small} onChange={setSmall} size="sm">
        <Typography variant="body">Small (16px)</Typography>
      </Checkbox>

      <Checkbox checked={medium} onChange={setMedium} size="md">
        <Typography variant="body">Medium (20px) - Default</Typography>
      </Checkbox>

      <Checkbox checked={large} onChange={setLarge} size="lg">
        <Typography variant="body">Large (24px)</Typography>
      </Checkbox>
    </Stack>
  );
};
