declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { FC } from "react";

  export const frontmatter: Record<string, unknown>;
  const MDXContent: FC<MDXProps>;
  export default MDXContent;
}
