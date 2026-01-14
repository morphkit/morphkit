import { useState } from "react";
import { Stack } from "../../stack";
import { Button } from "../../button";
import { Toast } from "../Toast";

export const BasicExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Stack gap="md">
      <Button onPress={() => setVisible(true)}>Show Toast</Button>
      <Toast
        visible={visible}
        message="This is a basic notification"
        onDismiss={() => setVisible(false)}
      />
    </Stack>
  );
};
