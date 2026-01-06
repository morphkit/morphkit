import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";
import { View } from "react-native";
import { useState } from "react";
import { Typography } from "../..";

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
          <Typography variant="heading" style={{ marginBottom: 8 }}>
            Product Overview
          </Typography>
          <Typography variant="body">
            This premium wireless headphones deliver exceptional sound quality
            with active noise cancellation. Perfect for music lovers and
            professionals alike.
          </Typography>
        </View>
      </TabsContent>
      <TabsContent value="details">
        <View style={{ padding: 16 }}>
          <Typography variant="heading" style={{ marginBottom: 8 }}>
            Specifications
          </Typography>
          <Typography variant="body">
            • Battery Life: 30 hours{"\n"}• Bluetooth 5.0{"\n"}• Weight: 250g
            {"\n"}• Charging: USB-C fast charging
          </Typography>
        </View>
      </TabsContent>
      <TabsContent value="reviews">
        <View style={{ padding: 16 }}>
          <Typography variant="heading" style={{ marginBottom: 8 }}>
            Customer Reviews
          </Typography>
          <Typography variant="body">
            {`⭐⭐⭐⭐⭐ "Amazing sound quality!"
⭐⭐⭐⭐ "Great for daily use"
⭐⭐⭐⭐⭐ "Best purchase this year"`}
          </Typography>
        </View>
      </TabsContent>
    </TabsContainer>
  );
};
