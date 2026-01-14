import { useState } from "react";
import { Stack } from "../../stack";
import { Input } from "../Input";

export const SizesExample = () => {
  const [smValue, setSmValue] = useState("");
  const [mdValue, setMdValue] = useState("");
  const [lgValue, setLgValue] = useState("");

  return (
    <Stack gap="md">
      <Input
        size="sm"
        value={smValue}
        onChange={setSmValue}
        label="Small"
        placeholder="Height: 36px"
      />
      <Input
        size="md"
        value={mdValue}
        onChange={setMdValue}
        label="Medium (default)"
        placeholder="Height: 44px"
      />
      <Input
        size="lg"
        value={lgValue}
        onChange={setLgValue}
        label="Large"
        placeholder="Height: 52px"
      />
    </Stack>
  );
};
