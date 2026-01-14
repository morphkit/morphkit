import { useState } from "react";
import { Slider } from "../Slider";
import { Stack } from "../../stack";
import { Typography } from "../../typography";

export const SizesExample = () => {
  const [smallValue, setSmallValue] = useState(30);
  const [mediumValue, setMediumValue] = useState(50);
  const [largeValue, setLargeValue] = useState(70);

  const createHandler =
    (setter: (v: number) => void) => (value: number | [number, number]) => {
      if (typeof value === "number") setter(value);
    };

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="footnote">Small (sm)</Typography>
        <Slider
          value={smallValue}
          onChange={createHandler(setSmallValue)}
          size="sm"
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="footnote">Medium (md) - Default</Typography>
        <Slider
          value={mediumValue}
          onChange={createHandler(setMediumValue)}
          size="md"
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="footnote">Large (lg)</Typography>
        <Slider
          value={largeValue}
          onChange={createHandler(setLargeValue)}
          size="lg"
        />
      </Stack>
    </Stack>
  );
};
