import { useState } from "react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { OTPInput } from "../OTPInput";

export const StatesExample = () => {
  const [errorValue, setErrorValue] = useState("123");
  const [disabledValue] = useState("456789");
  const [successValue] = useState("123456");

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Typography variant="caption-1">Error State</Typography>
        <OTPInput
          error
          value={errorValue}
          onChange={setErrorValue}
          autoFocus={false}
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1">Disabled State</Typography>
        <OTPInput
          disabled
          value={disabledValue}
          onChange={() => {}}
          autoFocus={false}
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1">Success State (All Filled)</Typography>
        <OTPInput value={successValue} onChange={() => {}} autoFocus={false} />
      </Stack>
    </Stack>
  );
};
