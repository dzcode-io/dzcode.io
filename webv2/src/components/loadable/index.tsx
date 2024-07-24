import { Loading } from '../loading';
import { loadableFactory } from './loadable-factory';

export const Loadable = loadableFactory<{ page: string }>(
  (props) => import(`src/pages/${props.page}/page`),
  {
    cacheKey: (props) => props.page,
    fallback: (
      <div className="self-center pt-8">
        <Loading />
      </div>
    ),
  },
) as React.FC<{ page: string }>;
