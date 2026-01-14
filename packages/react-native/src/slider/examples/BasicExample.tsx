import { useState } from "react";
import { Slider } from "../Slider";
import { Stack } from "../../stack";
import { Typography } from "../../typography";

export const BasicExample = () => {
  const [value, setValue] = useState(50);

  const handleChange = (newValue: number | [number, number]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <Stack gap="sm">
      <Typography variant="body">Volume: {value}</Typography>
      <Slider value={value} onChange={handleChange} />
    </Stack>
  );
};
