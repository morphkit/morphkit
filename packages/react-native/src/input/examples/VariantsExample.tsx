import { useState } from "react";
import { Flex } from "../../flex";
import { Input } from "../Input";

export const VariantsExample = () => {
  const [outlineValue, setOutlineValue] = useState("");
  const [filledValue, setFilledValue] = useState("");

  return (
    <Flex gap="md">
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
    </Flex>
  );
};
