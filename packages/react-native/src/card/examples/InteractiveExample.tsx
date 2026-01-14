import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { Card } from "../Card";

export const InteractiveExample = () => {
  return (
    <Stack gap="md">
      <Card variant="outline" onPress={() => {}}>
        <Typography variant="subhead">Pressable Card</Typography>
        <Typography variant="body">Tap to interact</Typography>
      </Card>
      <Card variant="elevated" onPress={() => {}}>
        <Typography variant="subhead">Elevated Pressable</Typography>
        <Typography variant="body">
          Press feedback with opacity change
        </Typography>
      </Card>
    </Stack>
  );
};
