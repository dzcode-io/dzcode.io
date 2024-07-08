import { loadableFactory } from './loadable-factory';

export const Loadable = loadableFactory<{ page: string }>(
  (props) => import(`src/pages/${props.page}/page`),
  {
    cacheKey: (props) => props.page,
  },
) as React.FC<{ page: string }>;
