import { useState } from "react";
import { Flex } from "../../flex";
import { Tag } from "../Tag";

export const InteractiveExample = () => {
  const [tags, setTags] = useState(["React Native", "TypeScript", "Expo"]);

  const handleDismiss = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Flex gap="sm" direction="horizontal" wrap>
      {tags.map((tag) => (
        <Tag key={tag} dismissible onDismiss={() => handleDismiss(tag)}>
          {tag}
        </Tag>
      ))}
    </Flex>
  );
};
