import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";
import { View, Text } from "react-native";
import { useState } from "react";

export const BasicExample = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <TabsContainer value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview" label="Overview" />
        <TabsTrigger value="details" label="Details" />
        <TabsTrigger value="reviews" label="Reviews" />
      </TabsList>
      <TabsContent value="overview">
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
            Product Overview
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
            This premium wireless headphones deliver exceptional sound quality
            with active noise cancellation. Perfect for music lovers and
            professionals alike.
          </Text>
        </View>
      </TabsContent>
      <TabsContent value="details">
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
            Specifications
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
            • Battery Life: 30 hours{"\n"}• Bluetooth 5.0{"\n"}• Weight: 250g
            {"\n"}• Charging: USB-C fast charging
          </Text>
        </View>
      </TabsContent>
      <TabsContent value="reviews">
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
            Customer Reviews
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 20, color: "#6B7280" }}>
            {`⭐⭐⭐⭐⭐ "Amazing sound quality!"
⭐⭐⭐⭐ "Great for daily use"
⭐⭐⭐⭐⭐ "Best purchase this year"`}
          </Text>
        </View>
      </TabsContent>
    </TabsContainer>
  );
};
