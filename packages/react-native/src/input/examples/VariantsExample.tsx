import { useState } from "react";
import { Stack } from "../../stack";
import { Input } from "../Input";

export const VariantsExample = () => {
  const [outlineValue, setOutlineValue] = useState("");
  const [filledValue, setFilledValue] = useState("");

  return (
    <Stack gap="md">
      <Input
        variant="outline"
        value={outlineValue}
        onChange={setOutlineValue}
        label="Outline Variant"
        placeholder="Default outline style"
      />
      <Input
        variant="filled"
        value={filledValue}
        onChange={setFilledValue}
        label="Filled Variant"
        placeholder="Filled background style"
      />
    </Stack>
  );
};
