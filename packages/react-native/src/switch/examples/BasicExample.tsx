import { useState } from "react";
import { Switch } from "../Switch";

export const BasicExample = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
    />
  );
};
