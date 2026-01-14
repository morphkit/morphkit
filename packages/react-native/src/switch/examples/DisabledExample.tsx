import { useState } from "react";
import { Stack } from "../../stack";
import { Switch } from "../Switch";

export const DisabledExample = () => {
  const [disabledOff, setDisabledOff] = useState(false);
  const [disabledOn, setDisabledOn] = useState(true);

  return (
    <Stack gap="md">
      <Switch
        checked={disabledOff}
        onChange={setDisabledOff}
        disabled
        label="Disabled (off)"
      />
      <Switch
        checked={disabledOn}
        onChange={setDisabledOn}
        disabled
        label="Disabled (on)"
      />
    </Stack>
  );
};
