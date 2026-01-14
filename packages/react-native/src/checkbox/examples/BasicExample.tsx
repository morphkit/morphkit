import { useState } from "react";
import { Stack, Typography } from "../..";
import { Checkbox } from "../Checkbox";

export const BasicExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Stack gap="md">
      <Checkbox checked={checked} onChange={setChecked}>
        <Typography variant="body">Accept terms and conditions</Typography>
      </Checkbox>
    </Stack>
  );
};
