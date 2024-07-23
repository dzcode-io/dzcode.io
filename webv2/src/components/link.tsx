import { Link as RRLink } from 'react-router-dom';
import type { LinkProps as RRLinkProps } from 'react-router-dom';

import type { PropsWithChildren } from 'react';
import { getInitialLanguageCode } from 'src/redux/slices/settings';
import { Languages } from './locale/languages';

interface LinkProps extends Omit<RRLinkProps, 'to'> {
  href?: string;
}

const initialLanguageCode = getInitialLanguageCode();

export function Link({ href = '/', ...props }: PropsWithChildren<LinkProps>): JSX.Element {
  if (initialLanguageCode !== Languages[0].code) {
    href = `/${initialLanguageCode}${href}`;
  }
  return <RRLink {...props} to={href} />;
}
