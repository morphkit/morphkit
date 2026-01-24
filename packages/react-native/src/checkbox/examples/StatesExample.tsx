import { useState } from "react";
import { Flex, Typography } from "../..";
import { Checkbox } from "../Checkbox";

export const StatesExample = () => {
  const [unchecked, setUnchecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <Flex gap="md">
      <Checkbox checked={unchecked} onChange={setUnchecked}>
        <Typography variant="body">Unchecked state</Typography>
      </Checkbox>

      <Checkbox checked={checked} onChange={setChecked}>
        <Typography variant="body">Checked state</Typography>
      </Checkbox>

      <Checkbox
        checked={indeterminate}
        onChange={setIndeterminate}
        indeterminate
      >
        <Typography variant="body">Indeterminate state</Typography>
      </Checkbox>
    </Flex>
  );
};
