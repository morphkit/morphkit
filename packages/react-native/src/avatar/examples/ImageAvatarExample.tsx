import { Stack } from "../../stack";
import { Avatar } from "../Avatar";

export const ImageAvatarExample = () => {
  return (
    <Stack direction="horizontal" gap="md" align="center">
      <Avatar
        size="md"
        source={{ uri: "https://i.pravatar.cc/100?img=1" }}
        fallback="JD"
      />
      <Avatar
        size="lg"
        source={{ uri: "https://i.pravatar.cc/100?img=2" }}
        fallback="AS"
      />
      <Avatar
        size="xl"
        source={{ uri: "https://i.pravatar.cc/100?img=3" }}
        fallback="MK"
      />
    </Stack>
  );
};
