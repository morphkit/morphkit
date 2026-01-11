import { Avatar } from "../Avatar";
import { Card, Stack, Typography, Button } from "../..";
import { useState } from "react";

export const InteractiveProfileExample = () => {
  const [following, setFollowing] = useState(false);

  return (
    <Card>
      <Stack gap="md">
        <Stack direction="horizontal" gap="md" align="center">
          <Avatar
            size="lg"
            source={{ uri: "https://i.pravatar.cc/48?img=5" }}
            onPress={() => console.log("Avatar tapped")}
          />
          <Stack gap="xs" style={{ flex: 1 }}>
            <Typography variant="heading">Sarah Miller</Typography>
            <Typography variant="callout" style={{ color: "#6B7280" }}>
              UX Researcher
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant={following ? "secondary" : "primary"}
          onPress={() => setFollowing(!following)}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </Stack>
    </Card>
  );
};
