import { useState } from "react";
import { Stack } from "../../stack";
import { Typography } from "../../typography";
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";

export const OrientationsExample = () => {
  const [horizontalTab, setHorizontalTab] = useState("home");
  const [verticalTab, setVerticalTab] = useState("profile");

  return (
    <Stack gap="xl">
      <Stack gap="sm">
        <Typography variant="subhead">
          Horizontal Orientation (Default)
        </Typography>
        <TabsContainer
          value={horizontalTab}
          onValueChange={setHorizontalTab}
          orientation="horizontal"
        >
          <TabsList>
            <TabsTrigger value="home" label="Home" />
            <TabsTrigger value="explore" label="Explore" />
            <TabsTrigger value="library" label="Library" />
          </TabsList>
          <TabsContent value="home">
            <Typography variant="body">
              Horizontal tabs support swipe gestures for navigation.
            </Typography>
          </TabsContent>
          <TabsContent value="explore">
            <Typography variant="body">Explore tab content.</Typography>
          </TabsContent>
          <TabsContent value="library">
            <Typography variant="body">Library tab content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Stack>

      <Stack gap="sm">
        <Typography variant="subhead">Vertical Orientation</Typography>
        <TabsContainer
          value={verticalTab}
          onValueChange={setVerticalTab}
          orientation="vertical"
        >
          <TabsList>
            <TabsTrigger value="profile" label="Profile" />
            <TabsTrigger value="security" label="Security" />
            <TabsTrigger value="privacy" label="Privacy" />
          </TabsList>
          <TabsContent value="profile">
            <Typography variant="body">
              Vertical tabs display content side by side with the tab list.
            </Typography>
          </TabsContent>
          <TabsContent value="security">
            <Typography variant="body">Security settings content.</Typography>
          </TabsContent>
          <TabsContent value="privacy">
            <Typography variant="body">Privacy settings content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Stack>
    </Stack>
  );
};
