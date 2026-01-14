import { useState } from "react";
import { Textarea } from "../Textarea";

export const BasicExample = () => {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Description"
      placeholder="Enter a description..."
      value={value}
      onChange={setValue}
    />
  );
};
