import { useState } from "react";
import { Flex } from "../../flex";
import { Button } from "../../button";
import { Toast } from "../Toast";

export const BasicExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Flex gap="md">
      <Button onPress={() => setVisible(true)}>Show Toast</Button>
      <Toast
        visible={visible}
        message="This is a basic notification"
        onDismiss={() => setVisible(false)}
      />
    </Flex>
  );
};
