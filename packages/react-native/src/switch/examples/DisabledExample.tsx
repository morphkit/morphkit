import { useState } from "react";
import { Flex } from "../../flex";
import { Switch } from "../Switch";

export const DisabledExample = () => {
  const [disabledOff, setDisabledOff] = useState(false);
  const [disabledOn, setDisabledOn] = useState(true);

  return (
    <Flex gap="md">
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
    </Flex>
  );
};
