import { useState } from "react";
import { StyleSheet } from "react-native";
import { Select, SelectOption } from "../Select";
import { Stack } from "../../stack";
import { Card } from "../../card";
import { Typography } from "../../typography";
import { useTheme } from "../../theme";

export const MultipleSelectionExample = () => {
  const [selected, setSelected] = useState<string[]>(["typescript"]);
  const { theme, colorScheme } = useTheme();

  const tokens = theme.component.select.variant[colorScheme];

  const isSelected = (value: string) => selected.includes(value);

  return (
    <Stack gap="md">
      <Typography variant="subhead">Select your skills (multiple):</Typography>
      <Select
        value={selected}
        onChange={(val) => setSelected(val as string[])}
        multiple
      >
        <Stack gap="sm">
          <SelectOption value="typescript">
            <Card
              variant="outline"
              style={[
                styles.option,
                isSelected("typescript") && {
                  borderColor: tokens.focus.border,
                },
              ]}
            >
              <Typography variant="body">TypeScript</Typography>
            </Card>
          </SelectOption>
          <SelectOption value="javascript">
            <Card
              variant="outline"
              style={[
                styles.option,
                isSelected("javascript") && {
                  borderColor: tokens.focus.border,
                },
              ]}
            >
              <Typography variant="body">JavaScript</Typography>
            </Card>
          </SelectOption>
          <SelectOption value="python">
            <Card
              variant="outline"
              style={[
                styles.option,
                isSelected("python") && { borderColor: tokens.focus.border },
              ]}
            >
              <Typography variant="body">Python</Typography>
            </Card>
          </SelectOption>
          <SelectOption value="rust">
            <Card
              variant="outline"
              style={[
                styles.option,
                isSelected("rust") && { borderColor: tokens.focus.border },
              ]}
            >
              <Typography variant="body">Rust</Typography>
            </Card>
          </SelectOption>
        </Stack>
      </Select>
      <Typography variant="caption-1">
        Selected: {selected.length > 0 ? selected.join(", ") : "None"}
      </Typography>
    </Stack>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
