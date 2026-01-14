import { useState } from "react";
import { Stack } from "../../stack";
import { Switch } from "../Switch";

export const SizesExample = () => {
  const [smallEnabled, setSmallEnabled] = useState(true);
  const [mediumEnabled, setMediumEnabled] = useState(true);
  const [largeEnabled, setLargeEnabled] = useState(true);

  return (
    <Stack gap="md">
      <Switch
        checked={smallEnabled}
        onChange={setSmallEnabled}
        size="sm"
        label="Small size"
      />
      <Switch
        checked={mediumEnabled}
        onChange={setMediumEnabled}
        size="md"
        label="Medium size"
      />
      <Switch
        checked={largeEnabled}
        onChange={setLargeEnabled}
        size="lg"
        label="Large size"
      />
    </Stack>
  );
};
