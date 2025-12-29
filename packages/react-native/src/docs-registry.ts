import React from "react";

import AvatarDocs from "./avatar/README.mdx";
import BadgeDocs from "./badge/README.mdx";
import ButtonDocs from "./button/README.mdx";
import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  avatar: AvatarDocs,
  badge: BadgeDocs,
  button: ButtonDocs,
  typography: TypographyDocs,
};
