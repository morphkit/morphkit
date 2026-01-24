import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { Card } from "../Card";

export const VariantsExample = () => {
  return (
    <Flex gap="md">
      <Card variant="elevated">
        <Typography variant="subhead">Elevated</Typography>
        <Typography variant="body">Default with prominent shadow</Typography>
      </Card>
      <Card variant="outline">
        <Typography variant="subhead">Outline</Typography>
        <Typography variant="body">Bordered with subtle depth</Typography>
      </Card>
      <Card variant="ghost">
        <Typography variant="subhead">Ghost</Typography>
        <Typography variant="body">Secondary surface background</Typography>
      </Card>
      <Card variant="filled">
        <Typography variant="subhead">Filled</Typography>
        <Typography variant="body">Tertiary surface background</Typography>
      </Card>
    </Flex>
  );
};
