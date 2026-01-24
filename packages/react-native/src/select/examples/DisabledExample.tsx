import { useState } from "react";
import { StyleSheet } from "react-native";
import { Select, SelectOption } from "../Select";
import { Flex } from "../../flex";
import { Card } from "../../card";
import { Typography } from "../../typography";
import { useTheme } from "../../theme";

export const DisabledExample = () => {
  const [selected, setSelected] = useState("option-1");
  const { theme, colorScheme } = useTheme();

  const tokens = theme.component.select.variant[colorScheme];

  return (
    <Flex gap="lg">
      <Flex gap="md">
        <Typography variant="subhead">Select-level disabled:</Typography>
        <Select
          value={selected}
          onChange={(val) => setSelected(val as string)}
          disabled
        >
          <Flex gap="sm">
            <SelectOption value="option-1">
              <Card
                variant="outline"
                style={[
                  styles.option,
                  selected === "option-1" && {
                    borderColor: tokens.focus.border,
                  },
                  { opacity: tokens.disabled.opacity },
                ]}
              >
                <Typography
                  variant="body"
                  style={{ color: tokens.disabled.text }}
                >
                  All options disabled
                </Typography>
              </Card>
            </SelectOption>
            <SelectOption value="option-2">
              <Card
                variant="outline"
                style={[
                  styles.option,
                  selected === "option-2" && {
                    borderColor: tokens.focus.border,
                  },
                  { opacity: tokens.disabled.opacity },
                ]}
              >
                <Typography
                  variant="body"
                  style={{ color: tokens.disabled.text }}
                >
                  Cannot interact
                </Typography>
              </Card>
            </SelectOption>
          </Flex>
        </Select>
      </Flex>

      <Flex gap="md">
        <Typography variant="subhead">Option-level disabled:</Typography>
        <Select value={selected} onChange={(val) => setSelected(val as string)}>
          <Flex gap="sm">
            <SelectOption value="option-1">
              <Card
                variant="outline"
                style={[
                  styles.option,
                  selected === "option-1" && {
                    borderColor: tokens.focus.border,
                  },
                ]}
              >
                <Typography variant="body">Enabled option</Typography>
              </Card>
            </SelectOption>
            <SelectOption value="option-2" disabled>
              <Card
                variant="outline"
                style={[styles.option, { opacity: tokens.disabled.opacity }]}
              >
                <Typography
                  variant="body"
                  style={{ color: tokens.disabled.text }}
                >
                  Disabled option
                </Typography>
              </Card>
            </SelectOption>
            <SelectOption value="option-3">
              <Card
                variant="outline"
                style={[
                  styles.option,
                  selected === "option-3" && {
                    borderColor: tokens.focus.border,
                  },
                ]}
              >
                <Typography variant="body">Another enabled option</Typography>
              </Card>
            </SelectOption>
          </Flex>
        </Select>
      </Flex>
    </Flex>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
