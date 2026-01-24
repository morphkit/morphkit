import { useState } from "react";
import { Slider } from "../Slider";
import { Flex } from "../../flex";
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
    <Flex gap="lg">
      <Flex gap="xs">
        <Typography variant="footnote">Small (sm)</Typography>
        <Slider
          value={smallValue}
          onChange={createHandler(setSmallValue)}
          size="sm"
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="footnote">Medium (md) - Default</Typography>
        <Slider
          value={mediumValue}
          onChange={createHandler(setMediumValue)}
          size="md"
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="footnote">Large (lg)</Typography>
        <Slider
          value={largeValue}
          onChange={createHandler(setLargeValue)}
          size="lg"
        />
      </Flex>
    </Flex>
  );
};
