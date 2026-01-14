import { useState } from "react";
import { Stack } from "../../stack";
import { Button } from "../../button";
import { Typography } from "../../typography";
import { Toast } from "../Toast";

export const InteractiveExample = () => {
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(3000);

  return (
    <Stack gap="md">
      <Typography variant="subhead">Auto-dismiss in {duration}ms</Typography>
      <Stack gap="sm" direction="horizontal">
        <Button variant="tonal" size="sm" onPress={() => setDuration(1000)}>
          1s
        </Button>
        <Button variant="tonal" size="sm" onPress={() => setDuration(3000)}>
          3s
        </Button>
        <Button variant="tonal" size="sm" onPress={() => setDuration(5000)}>
          5s
        </Button>
        <Button variant="tonal" size="sm" onPress={() => setDuration(0)}>
          Manual
        </Button>
      </Stack>
      <Button onPress={() => setVisible(true)}>Show Toast</Button>
      <Toast
        visible={visible}
        message={
          duration > 0
            ? `Auto-dismisses in ${duration / 1000}s`
            : "Tap button again to dismiss"
        }
        duration={duration}
        onDismiss={() => setVisible(false)}
      />
    </Stack>
  );
};
