import { useState } from "react";
import { Input } from "../Input";

export const BasicExample = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={setValue}
      label="Email"
      placeholder="Enter your email"
    />
  );
};
