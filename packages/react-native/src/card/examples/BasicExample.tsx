import { Typography } from "../../typography";
import { Card } from "../Card";

export const BasicExample = () => {
  return (
    <Card>
      <Typography variant="heading">Card Title</Typography>
      <Typography variant="body">
        This is a basic card with default elevated styling.
      </Typography>
    </Card>
  );
};
