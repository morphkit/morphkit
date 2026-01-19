import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "../../avatar";
import { Box } from "../../box";
import { Button } from "../../button";
import { Stack } from "../../stack";
import { Switch } from "../../switch";
import { Typography } from "../../typography";
import { Card } from "../Card";

const UserProfileCard = () => {
  const [following, setFollowing] = useState(false);

  return (
    <Card variant="outline" onPress={() => {}}>
      <View style={baseStyles.profileRow}>
        <Avatar fallback="SJ" size="lg" />
        <View style={baseStyles.profileInfo}>
          <Typography variant="subhead">Sarah Johnson</Typography>
          <Typography variant="footnote" style={baseStyles.role}>
            Senior Product Designer
          </Typography>
        </View>
        <Button
          variant={following ? "secondary" : "primary"}
          size="sm"
          onPress={() => setFollowing(!following)}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </View>
    </Card>
  );
};

const SettingsCard = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <Card variant="elevated" onPress={() => {}}>
      <View style={baseStyles.settingsRow}>
        <Box
          backgroundColor="#DBEAFE"
          borderRadius={8}
          padding={8}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body">🔔</Typography>
        </Box>
        <View style={baseStyles.settingsInfo}>
          <Typography variant="subhead">Push Notifications</Typography>
          <Typography variant="footnote" style={baseStyles.settingsDescription}>
            Receive alerts for new messages
          </Typography>
        </View>
        <Switch
          checked={notificationsEnabled}
          onChange={setNotificationsEnabled}
        />
      </View>
    </Card>
  );
};

export const InteractiveExample = () => {
  return (
    <Stack gap="md">
      <UserProfileCard />
      <SettingsCard />
    </Stack>
  );
};

const baseStyles = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileInfo: {
    flex: 1,
  },
  role: {
    opacity: 0.7,
    marginTop: 2,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingsInfo: {
    flex: 1,
  },
  settingsDescription: {
    opacity: 0.7,
    marginTop: 2,
  },
});
