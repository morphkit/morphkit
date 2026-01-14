import { useState } from "react";
import { Stack } from "../../stack";
import { Switch } from "../Switch";

export const StatesExample = () => {
  const [checkedState, setCheckedState] = useState(true);
  const [uncheckedState, setUncheckedState] = useState(false);

  return (
    <Stack gap="md">
      <Switch
        checked={uncheckedState}
        onChange={setUncheckedState}
        label="Off state"
      />
      <Switch
        checked={checkedState}
        onChange={setCheckedState}
        label="On state"
      />
    </Stack>
  );
};
