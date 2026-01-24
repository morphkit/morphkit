import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Textarea } from "../Textarea";

export const CharacterCountExample = () => {
  const [withoutLimit, setWithoutLimit] = useState("Hello world");
  const [withLimit, setWithLimit] = useState("");

  return (
    <Flex gap="md">
      <Flex gap="xs">
        <Typography variant="caption-1">Without max length</Typography>
        <Textarea
          placeholder="Type anything..."
          value={withoutLimit}
          onChange={setWithoutLimit}
          showCount
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">With max length (100)</Typography>
        <Textarea
          placeholder="Limited to 100 characters..."
          value={withLimit}
          onChange={setWithLimit}
          showCount
          maxLength={100}
        />
      </Flex>
    </Flex>
  );
};
