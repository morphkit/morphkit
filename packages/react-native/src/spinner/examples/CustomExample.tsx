import { Stack } from "../../stack";
import { useTheme } from "../../theme";
import { Spinner } from "../Spinner";

export const CustomExample = () => {
  const { theme } = useTheme();
  const statusColors = theme.semantic.colors.status;

  return (
    <Stack gap="md" direction="horizontal" align="center">
      <Spinner size={40} color={statusColors.success.main} />
      <Spinner size={48} color={statusColors.warning.main} />
      <Spinner size={56} color={statusColors.error.main} />
    </Stack>
  );
};
