import { useState } from "react";
import { Slider } from "../Slider";
import { Stack } from "../../stack";
import { Typography } from "../../typography";

export const RangeExample = () => {
  const [range, setRange] = useState<[number, number]>([25, 75]);

  const handleChange = (value: number | [number, number]) => {
    if (Array.isArray(value)) {
      setRange(value);
    }
  };

  return (
    <Stack gap="sm">
      <Typography variant="body">
        Price Range: ${range[0]} - ${range[1]}
      </Typography>
      <Slider value={range} onChange={handleChange} showValue />
    </Stack>
  );
};
