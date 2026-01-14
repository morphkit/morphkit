import { useState } from "react";
import { OTPInput } from "../OTPInput";

export const BasicExample = () => {
  const [value, setValue] = useState("");

  return <OTPInput value={value} onChange={setValue} autoFocus={false} />;
};
