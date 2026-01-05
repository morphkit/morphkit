import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export const AdvancedExample = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <TabsContainer
      value={activeTab}
      onValueChange={setActiveTab}
      orientation="vertical"
      variant="pills"
    >
      <TabsList>
        <TabsTrigger
          value="account"
          label="Account"
          icon={<Ionicons name="person" size={16} color="#FFFFFF" />}
        />
        <TabsTrigger
          value="security"
          label="Security"
          icon={<Ionicons name="lock-closed" size={16} color="#6B7280" />}
        />
        <TabsTrigger
          value="notifications"
          label="Notifications"
          icon={<Ionicons name="notifications" size={16} color="#6B7280" />}
          disabled
        />
      </TabsList>
      <TabsContent value="account">
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Account Settings</Text>
        <Text style={{ color: "#6B7280" }}>
          Manage your account information and preferences
        </Text>
      </TabsContent>
      <TabsContent value="security">
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Security Settings</Text>
        <Text style={{ color: "#6B7280" }}>
          Configure your security and privacy options
        </Text>
      </TabsContent>
      <TabsContent value="notifications">
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Notification Settings
        </Text>
        <Text style={{ color: "#6B7280" }}>
          Control your notification preferences
        </Text>
      </TabsContent>
    </TabsContainer>
  );
};
