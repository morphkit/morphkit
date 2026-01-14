import { useState } from "react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Textarea } from "../Textarea";

export const SizesExample = () => {
  const [smallValue, setSmallValue] = useState("");
  const [mediumValue, setMediumValue] = useState("");
  const [largeValue, setLargeValue] = useState("");

  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Typography variant="caption-1">Small</Typography>
        <Textarea
          size="sm"
          placeholder="Small textarea..."
          value={smallValue}
          onChange={setSmallValue}
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1">Medium (default)</Typography>
        <Textarea
          size="md"
          placeholder="Medium textarea..."
          value={mediumValue}
          onChange={setMediumValue}
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1">Large</Typography>
        <Textarea
          size="lg"
          placeholder="Large textarea..."
          value={largeValue}
          onChange={setLargeValue}
        />
      </Stack>
    </Stack>
  );
};
