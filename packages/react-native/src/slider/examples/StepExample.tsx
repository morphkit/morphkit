import { useState } from "react";
import { Slider } from "../Slider";
import { Stack } from "../../stack";
import { Typography } from "../../typography";

export const StepExample = () => {
  const [stepValue, setStepValue] = useState(50);
  const [continuousValue, setContinuousValue] = useState(33.3);

  const handleStepChange = (value: number | [number, number]) => {
    if (typeof value === "number") setStepValue(value);
  };

  const handleContinuousChange = (value: number | [number, number]) => {
    if (typeof value === "number") setContinuousValue(value);
  };

  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Typography variant="footnote">Step: 10</Typography>
        <Typography variant="body">Value: {stepValue}</Typography>
        <Slider
          value={stepValue}
          onChange={handleStepChange}
          step={10}
          showValue
        />
      </Stack>
      <Stack gap="sm">
        <Typography variant="footnote">Continuous (step: 0)</Typography>
        <Typography variant="body">
          Value: {continuousValue.toFixed(1)}
        </Typography>
        <Slider
          value={continuousValue}
          onChange={handleContinuousChange}
          step={0}
        />
      </Stack>
    </Stack>
  );
};
