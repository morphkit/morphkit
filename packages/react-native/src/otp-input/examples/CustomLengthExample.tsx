import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { OTPInput } from "../OTPInput";

export const CustomLengthExample = () => {
  const [fourDigitValue, setFourDigitValue] = useState("12");
  const [sixDigitValue, setSixDigitValue] = useState("123");

  return (
    <Flex gap="lg">
      <Flex gap="xs">
        <Typography variant="caption-1">4-Digit Code</Typography>
        <OTPInput
          length={4}
          value={fourDigitValue}
          onChange={setFourDigitValue}
          autoFocus={false}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">6-Digit Code (Default)</Typography>
        <OTPInput
          length={6}
          value={sixDigitValue}
          onChange={setSixDigitValue}
          autoFocus={false}
        />
      </Flex>
    </Flex>
  );
};
