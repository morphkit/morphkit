import { useState } from "react";
import { Textarea } from "../Textarea";

export const AutoResizeExample = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Auto-resize textarea"
      placeholder="Start typing to see the textarea grow..."
      value={value}
      onChange={setValue}
      autoResize
      rows={2}
    />
  );
};
