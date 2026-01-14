import { Stack } from "../../stack";
import { Typography } from "../Typography";

export const VariantsExample = () => {
  return (
    <Stack gap="md">
      <Typography variant="large-title">Large Title (34pt)</Typography>
      <Typography variant="title-1">Title 1 (28pt)</Typography>
      <Typography variant="title-2">Title 2 (22pt)</Typography>
      <Typography variant="title-3">Title 3 (20pt)</Typography>
      <Typography variant="heading">Heading (17pt semibold)</Typography>
      <Typography variant="body">Body (17pt)</Typography>
      <Typography variant="callout">Callout (16pt)</Typography>
      <Typography variant="subhead">Subhead (14pt)</Typography>
      <Typography variant="footnote">Footnote (13pt)</Typography>
      <Typography variant="caption-1">Caption 1 (12pt)</Typography>
      <Typography variant="caption-2">Caption 2 (11pt)</Typography>
    </Stack>
  );
};
