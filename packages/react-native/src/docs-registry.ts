import React from "react";

import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  typography: TypographyDocs,
};
