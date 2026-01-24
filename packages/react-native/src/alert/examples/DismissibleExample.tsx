import { Flex } from "../../flex";
import { Alert } from "../Alert";

export const DismissibleExample = () => {
  return (
    <Flex gap="md">
      <Alert
        variant="info"
        title="Dismissible Alert"
        description="Press the X button to dismiss this alert."
        dismissible
      />
      <Alert
        variant="success"
        title="Action Completed"
        description="Your changes have been saved successfully."
        dismissible
      />
    </Flex>
  );
};
