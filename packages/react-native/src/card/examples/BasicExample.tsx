import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Box } from "../../box";
import { Button } from "../../button";
import { Flex } from "../../flex";
import { Tag } from "../../tag";
import { Typography } from "../../typography";
import { Card } from "../Card";

export const BasicExample = () => {
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <Card>
      <Flex gap="md">
        <Box
          backgroundColor="#E0F2FE"
          borderRadius={8}
          padding={24}
          alignItems="center"
          justifyContent="center"
          style={baseStyles.imagePlaceholder}
        >
          <Typography variant="title-2" style={baseStyles.productEmoji}>
            👟
          </Typography>
        </Box>

        <View>
          <View style={baseStyles.headerRow}>
            <Typography variant="subhead">Running Shoes Pro</Typography>
            <Tag variant="success">In Stock</Tag>
          </View>
          <Typography variant="body" style={baseStyles.price}>
            $129.99
          </Typography>
          <Typography variant="footnote" style={baseStyles.rating}>
            ★★★★☆ (4.2) · 128 reviews
          </Typography>
        </View>

        <Button
          variant={addedToCart ? "secondary" : "primary"}
          onPress={() => setAddedToCart(!addedToCart)}
        >
          {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
        </Button>
      </Flex>
    </Card>
  );
};

const baseStyles = StyleSheet.create({
  imagePlaceholder: {
    height: 120,
  },
  productEmoji: {
    fontSize: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    marginTop: 4,
  },
  rating: {
    marginTop: 4,
    opacity: 0.7,
  },
});
