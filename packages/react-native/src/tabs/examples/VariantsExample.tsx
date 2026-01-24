import { useState } from "react";
import { Flex } from "../../flex";
import { Typography } from "../../typography";
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from "../Tabs";

export const VariantsExample = () => {
  const [lineTab, setLineTab] = useState("tab1");
  const [filledTab, setFilledTab] = useState("tab1");
  const [pillsTab, setPillsTab] = useState("tab1");

  return (
    <Flex gap="lg">
      <Flex gap="sm">
        <Typography variant="subhead">Line Variant (Default)</Typography>
        <TabsContainer
          value={lineTab}
          onValueChange={setLineTab}
          variant="line"
        >
          <TabsList>
            <TabsTrigger value="tab1" label="First" />
            <TabsTrigger value="tab2" label="Second" />
            <TabsTrigger value="tab3" label="Third" />
          </TabsList>
          <TabsContent value="tab1">
            <Typography variant="body">
              Line variant uses an underline indicator.
            </Typography>
          </TabsContent>
          <TabsContent value="tab2">
            <Typography variant="body">Second tab content.</Typography>
          </TabsContent>
          <TabsContent value="tab3">
            <Typography variant="body">Third tab content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Flex>

      <Flex gap="sm">
        <Typography variant="subhead">Filled Variant</Typography>
        <TabsContainer
          value={filledTab}
          onValueChange={setFilledTab}
          variant="filled"
        >
          <TabsList>
            <TabsTrigger value="tab1" label="First" />
            <TabsTrigger value="tab2" label="Second" />
            <TabsTrigger value="tab3" label="Third" />
          </TabsList>
          <TabsContent value="tab1">
            <Typography variant="body">
              Filled variant uses background color.
            </Typography>
          </TabsContent>
          <TabsContent value="tab2">
            <Typography variant="body">Second tab content.</Typography>
          </TabsContent>
          <TabsContent value="tab3">
            <Typography variant="body">Third tab content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Flex>

      <Flex gap="sm">
        <Typography variant="subhead">Pills Variant</Typography>
        <TabsContainer
          value={pillsTab}
          onValueChange={setPillsTab}
          variant="pills"
        >
          <TabsList>
            <TabsTrigger value="tab1" label="First" />
            <TabsTrigger value="tab2" label="Second" />
            <TabsTrigger value="tab3" label="Third" />
          </TabsList>
          <TabsContent value="tab1">
            <Typography variant="body">
              Pills variant uses rounded backgrounds.
            </Typography>
          </TabsContent>
          <TabsContent value="tab2">
            <Typography variant="body">Second tab content.</Typography>
          </TabsContent>
          <TabsContent value="tab3">
            <Typography variant="body">Third tab content.</Typography>
          </TabsContent>
        </TabsContainer>
      </Flex>
    </Flex>
  );
};
