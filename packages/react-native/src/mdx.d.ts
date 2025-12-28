declare module "*.mdx" {
  import React from "react";
  const Component: React.FC<{ components?: Record<string, React.ComponentType> }>;
  export default Component;
}
