import { Loading } from '../loading';
import { loadableFactory } from './loadable-factory';

export const Loadable = loadableFactory<{ page: string }>(
  (props) => import(`src/pages/${props.page}/page`),
  {
    cacheKey: (props) => props.page,
    fallback: <Loading />,
  },
) as React.FC<{ page: string }>;
