import { useState } from "react";
import { Flex } from "../../flex";
import { Label } from "../Label";
import { Input } from "../../input";

export const FormExample = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Flex gap="sm">
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
    </Flex>
  );
};
