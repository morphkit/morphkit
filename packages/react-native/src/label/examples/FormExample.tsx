import { useState } from "react";
import { Stack } from "../../stack";
import { Label } from "../Label";
import { Input } from "../../input";

export const FormExample = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Stack gap="sm">
      <Label required>Email address</Label>
      <Input
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
        type="email"
      />
      <Label>Phone number (optional)</Label>
      <Input
        value={phone}
        onChange={setPhone}
        placeholder="Enter your phone"
        type="number"
      />
    </Stack>
  );
};
