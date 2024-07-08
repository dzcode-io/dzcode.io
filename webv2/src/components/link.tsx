import { Link as RRLink } from 'react-router-dom';
import type { LinkProps as RRLinkProps } from 'react-router-dom';

import type { PropsWithChildren } from 'react';

interface LinkProps extends Omit<RRLinkProps, 'to'> {
  href: string;
}

export function Link({
  href,
  ...props
}: PropsWithChildren<LinkProps>): JSX.Element {
  return <RRLink {...props} to={href} />;
}
