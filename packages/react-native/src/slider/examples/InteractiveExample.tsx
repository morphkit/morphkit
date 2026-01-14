import { useState } from "react";
import { Slider } from "../Slider";
import { Stack } from "../../stack";
import { Typography } from "../../typography";

export const InteractiveExample = () => {
  const [value, setValue] = useState(50);
  const [valueWithDisplay, setValueWithDisplay] = useState(75);

  const handleChange = (newValue: number | [number, number]) => {
    if (typeof newValue === "number") setValue(newValue);
  };

  const handleDisplayChange = (newValue: number | [number, number]) => {
    if (typeof newValue === "number") setValueWithDisplay(newValue);
  };

  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Typography variant="footnote">Disabled</Typography>
        <Slider value={50} onChange={() => {}} disabled />
      </Stack>
      <Stack gap="sm">
        <Typography variant="footnote">With Value Display</Typography>
        <Slider
          value={valueWithDisplay}
          onChange={handleDisplayChange}
          showValue
        />
      </Stack>
      <Stack gap="sm">
        <Typography variant="footnote">Normal</Typography>
        <Slider value={value} onChange={handleChange} />
      </Stack>
    </Stack>
  );
};
