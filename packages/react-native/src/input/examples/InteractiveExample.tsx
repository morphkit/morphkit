import { useState } from "react";
import { Stack } from "../../stack";
import { Input } from "../Input";

export const InteractiveExample = () => {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [errorValue, setErrorValue] = useState("invalid@");
  const [disabledValue] = useState("Cannot edit");

  return (
    <Stack gap="md">
      <Input
        type="text"
        value={textValue}
        onChange={setTextValue}
        label="Text Input"
        placeholder="Default keyboard"
      />
      <Input
        type="email"
        value={emailValue}
        onChange={setEmailValue}
        label="Email Input"
        placeholder="Email keyboard"
      />
      <Input
        type="password"
        value={passwordValue}
        onChange={setPasswordValue}
        label="Password Input"
        placeholder="Secure text entry"
      />
      <Input
        type="number"
        value={numberValue}
        onChange={setNumberValue}
        label="Number Input"
        placeholder="Numeric keyboard"
      />
      <Input
        value={errorValue}
        onChange={setErrorValue}
        label="With Error"
        error="Please enter a valid email address"
      />
      <Input
        disabled
        value={disabledValue}
        onChange={() => {}}
        label="Disabled Input"
      />
    </Stack>
  );
};
