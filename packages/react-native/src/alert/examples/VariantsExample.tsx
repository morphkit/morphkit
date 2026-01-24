import { Flex } from "../../flex";
import { Alert } from "../Alert";

export const VariantsExample = () => {
  return (
    <Flex gap="md">
      <Alert variant="info" title="Info" description="Informational message" />
      <Alert
        variant="success"
        title="Success"
        description="Operation completed"
      />
      <Alert
        variant="warning"
        title="Warning"
        description="Please be careful"
      />
      <Alert variant="error" title="Error" description="Something went wrong" />
    </Flex>
  );
};
