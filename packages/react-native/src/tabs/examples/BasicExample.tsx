import { useState } from "react";
import { Typography } from "../../typography";
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";

export const BasicExample = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <TabsContainer value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="account" label="Account" />
        <TabsTrigger value="settings" label="Settings" />
        <TabsTrigger value="notifications" label="Notifications" />
      </TabsList>
      <TabsContent value="account">
        <Typography variant="body">
          Manage your account details here.
        </Typography>
      </TabsContent>
      <TabsContent value="settings">
        <Typography variant="body">Configure your preferences.</Typography>
      </TabsContent>
      <TabsContent value="notifications">
        <Typography variant="body">
          Control your notification settings.
        </Typography>
      </TabsContent>
    </TabsContainer>
  );
};
