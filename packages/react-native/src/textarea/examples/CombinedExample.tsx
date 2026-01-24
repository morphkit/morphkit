import { useState } from "react";
import { Flex } from "../../flex";
import { Textarea } from "../Textarea";

export const CombinedExample = () => {
  const [value, setValue] = useState("");

  return (
    <Flex gap="md">
      <Textarea
        label="Feedback"
        placeholder="Share your thoughts (max 500 characters)..."
        value={value}
        onChange={setValue}
        size="lg"
        rows={5}
        maxLength={500}
        showCount
        autoResize
      />
    </Flex>
  );
};
