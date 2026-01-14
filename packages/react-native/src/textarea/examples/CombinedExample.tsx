import { useState } from "react";
import { Stack } from "../../stack";
import { Textarea } from "../Textarea";

export const CombinedExample = () => {
  const [value, setValue] = useState("");

  return (
    <Stack gap="md">
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
    </Stack>
  );
};
