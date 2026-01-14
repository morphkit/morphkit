import { useState } from "react";
import { RadioGroup, RadioButton } from "../Radio";
import { Typography } from "../../typography";

export const BasicExample = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioButton value="option1">
        <Typography variant="body">Option 1</Typography>
      </RadioButton>
      <RadioButton value="option2">
        <Typography variant="body">Option 2</Typography>
      </RadioButton>
      <RadioButton value="option3">
        <Typography variant="body">Option 3</Typography>
      </RadioButton>
    </RadioGroup>
  );
};
