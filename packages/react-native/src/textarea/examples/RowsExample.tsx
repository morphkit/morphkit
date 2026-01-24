import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Textarea } from "../Textarea";

export const RowsExample = () => {
  const [twoRows, setTwoRows] = useState("");
  const [sixRows, setSixRows] = useState("");

  return (
    <Flex gap="md">
      <Flex gap="xs">
        <Typography variant="caption-1">2 rows</Typography>
        <Textarea
          placeholder="2 visible rows..."
          value={twoRows}
          onChange={setTwoRows}
          rows={2}
        />
      </Flex>
      <Flex gap="xs">
        <Typography variant="caption-1">6 rows</Typography>
        <Textarea
          placeholder="6 visible rows..."
          value={sixRows}
          onChange={setSixRows}
          rows={6}
        />
      </Flex>
    </Flex>
  );
};
