import React from "react";

import ButtonDocs from "./button/README.mdx";
import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  button: ButtonDocs,
  typography: TypographyDocs,
};
