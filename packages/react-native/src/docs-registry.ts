import React from "react";

import AvatarDocs from "./avatar/README.mdx";
import BadgeDocs from "./badge/README.mdx";
import BoxDocs from "./box/README.mdx";
import ButtonDocs from "./button/README.mdx";
import CardDocs from "./card/README.mdx";
import ContainerDocs from "./container/README.mdx";
import DividerDocs from "./divider/README.mdx";
import StackDocs from "./stack/README.mdx";
import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  avatar: AvatarDocs,
  badge: BadgeDocs,
  box: BoxDocs,
  button: ButtonDocs,
  card: CardDocs,
  container: ContainerDocs,
  divider: DividerDocs,
  stack: StackDocs,
  typography: TypographyDocs,
};
