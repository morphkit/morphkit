import { useState } from "react";
import { StyleSheet } from "react-native";
import { Select, SelectOption } from "../Select";
import { Stack } from "../../stack";
import { Card } from "../../card";
import { Typography } from "../../typography";
import { useTheme } from "../../theme";

export const BasicExample = () => {
  const [selected, setSelected] = useState("react-native");
  const { theme, colorScheme } = useTheme();

  const tokens = theme.component.select.variant[colorScheme];

  return (
    <Stack gap="md">
      <Typography variant="subhead">Choose a framework:</Typography>
      <Select value={selected} onChange={(val) => setSelected(val as string)}>
        <Stack gap="sm">
          <SelectOption value="react-native">
            <Card
              variant="outline"
              style={[
                styles.option,
                selected === "react-native" && {
                  borderColor: tokens.focus.border,
                },
              ]}
            >
              <Typography variant="body">React Native</Typography>
            </Card>
          </SelectOption>
          <SelectOption value="flutter">
            <Card
              variant="outline"
              style={[
                styles.option,
                selected === "flutter" && { borderColor: tokens.focus.border },
              ]}
            >
              <Typography variant="body">Flutter</Typography>
            </Card>
          </SelectOption>
          <SelectOption value="swift">
            <Card
              variant="outline"
              style={[
                styles.option,
                selected === "swift" && { borderColor: tokens.focus.border },
              ]}
            >
              <Typography variant="body">Swift UI</Typography>
            </Card>
          </SelectOption>
        </Stack>
      </Select>
      <Typography variant="caption-1">Selected: {selected}</Typography>
    </Stack>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
