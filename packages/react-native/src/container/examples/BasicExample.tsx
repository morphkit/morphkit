import { Box } from "../../box";
import { Typography } from "../../typography";
import { Container } from "../Container";

export const BasicExample = () => {
  return (
    <Container>
      <Box backgroundColor="#E0F2FE" padding={16} borderRadius={8}>
        <Typography variant="body">
          Content centered with default lg max-width (1024px) and 16px
          horizontal padding.
        </Typography>
      </Box>
    </Container>
  );
};
