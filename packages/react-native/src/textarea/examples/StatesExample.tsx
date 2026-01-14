import { useState } from "react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Textarea } from "../Textarea";

export const StatesExample = () => {
  const [errorValue, setErrorValue] = useState("");
  const [disabledValue] = useState("This content cannot be edited");

  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Typography variant="caption-1">Error state</Typography>
        <Textarea
          label="Bio"
          placeholder="Enter your bio..."
          value={errorValue}
          onChange={setErrorValue}
          error="Bio is required"
        />
      </Stack>
      <Stack gap="xs">
        <Typography variant="caption-1">Disabled state</Typography>
        <Textarea
          label="Read-only content"
          value={disabledValue}
          onChange={() => {}}
          disabled
        />
      </Stack>
    </Stack>
  );
};
