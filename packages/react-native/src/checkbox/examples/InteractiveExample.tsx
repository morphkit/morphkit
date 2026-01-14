import { useState } from "react";
import { Stack, Typography } from "../..";
import { Checkbox } from "../Checkbox";
import { useTheme } from "../../theme";

export const InteractiveExample = () => {
  const [disabled, setDisabled] = useState(true);
  const [customColor, setCustomColor] = useState(true);
  const { theme } = useTheme();

  return (
    <Stack gap="md">
      <Checkbox checked={disabled} onChange={setDisabled} disabled>
        <Typography variant="body">Disabled checkbox</Typography>
      </Checkbox>

      <Checkbox
        checked={customColor}
        onChange={setCustomColor}
        color={theme.semantic.colors.status.success.main}
      >
        <Typography variant="body">Custom color (success)</Typography>
      </Checkbox>
    </Stack>
  );
};
