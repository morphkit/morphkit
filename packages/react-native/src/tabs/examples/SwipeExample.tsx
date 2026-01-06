import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";
import { View, Text } from "react-native";
import { useState } from "react";

export const SwipeExample = () => {
  const [activeTab, setActiveTab] = useState("code");

  return (
    <TabsContainer
      value={activeTab}
      onValueChange={setActiveTab}
      variant="pills"
    >
      <TabsList>
        <TabsTrigger value="code" label="Code" />
        <TabsTrigger value="preview" label="Preview" />
        <TabsTrigger value="docs" label="Docs" />
      </TabsList>
      <TabsContent value="code">
        <View
          style={{ padding: 16, backgroundColor: "#1F2937", borderRadius: 8 }}
        >
          <Text
            style={{ fontFamily: "monospace", fontSize: 12, color: "#10B981" }}
          >
            {`const App = () => {
  return <View>...</View>;
};`}
          </Text>
        </View>
      </TabsContent>
      <TabsContent value="preview">
        <View
          style={{ padding: 16, backgroundColor: "#F3F4F6", borderRadius: 8 }}
        >
          <Text style={{ fontSize: 14, color: "#1F2937" }}>
            Preview of your component appears here
          </Text>
        </View>
      </TabsContent>
      <TabsContent value="docs">
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
            API documentation and usage examples
          </Text>
        </View>
      </TabsContent>
    </TabsContainer>
  );
};
