import React from "react";

import AvatarDocs from "./avatar/README.mdx";
import ButtonDocs from "./button/README.mdx";
import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  avatar: AvatarDocs,
  button: ButtonDocs,
  typography: TypographyDocs,
};
