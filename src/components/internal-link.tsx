import type { ComponentProps } from "react";
import { Link } from "react-router";

export interface InternalLinkProps extends ComponentProps<"a"> {
  href: string;
}

export function InternalLink(props: InternalLinkProps): React.ReactNode {
  const { href, children, ...rest } = props;

  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
