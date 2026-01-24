import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Textarea } from "../Textarea";

export const SizesExample = () => {
  const [smallValue, setSmallValue] = useState("");
  const [mediumValue, setMediumValue] = useState("");
  const [largeValue, setLargeValue] = useState("");

  return (
    <Flex gap="md">
      <Flex gap="xs">
        <Typography variant="caption-1">Small</Typography>
        <Textarea
          size="sm"
          placeholder="Small textarea..."
          value={smallValue}
          onChange={setSmallValue}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">Medium (default)</Typography>
        <Textarea
          size="md"
          placeholder="Medium textarea..."
          value={mediumValue}
          onChange={setMediumValue}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">Large</Typography>
        <Textarea
          size="lg"
          placeholder="Large textarea..."
          value={largeValue}
          onChange={setLargeValue}
        />
      </Flex>
    </Flex>
  );
};
