import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";

export const InteractiveExample = () => {
  const [disabledTab, setDisabledTab] = useState("active");
  const [containerDisabledTab, setContainerDisabledTab] = useState("first");

  return (
    <Flex gap="xl">
      <Flex gap="sm">
        <Typography variant="subhead">Individual Disabled Tab</Typography>
        <TabsContainer value={disabledTab} onValueChange={setDisabledTab}>
          <TabsList>
            <TabsTrigger value="active" label="Active Tab" />
            <TabsTrigger value="disabled" label="Disabled Tab" disabled />
            <TabsTrigger value="another" label="Another Tab" />
          </TabsList>
          <TabsContent value="active">
            <Typography variant="body">
              This tab is active and interactive.
            </Typography>
          </TabsContent>
          <TabsContent value="disabled">
            <Typography variant="body">This content is never shown.</Typography>
          </TabsContent>
          <TabsContent value="another">
            <Typography variant="body">Another active tab content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Flex>

      <Flex gap="sm">
        <Typography variant="subhead">Container-Level Disabled</Typography>
        <TabsContainer
          value={containerDisabledTab}
          onValueChange={setContainerDisabledTab}
          disabled
        >
          <TabsList>
            <TabsTrigger value="first" label="First" />
            <TabsTrigger value="second" label="Second" />
            <TabsTrigger value="third" label="Third" />
          </TabsList>
          <TabsContent value="first">
            <Typography variant="body">
              All tabs are disabled at container level.
            </Typography>
          </TabsContent>
          <TabsContent value="second">
            <Typography variant="body">Second tab content.</Typography>
          </TabsContent>
          <TabsContent value="third">
            <Typography variant="body">Third tab content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Flex>
    </Flex>
  );
};
