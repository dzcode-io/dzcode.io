import loadableFactory from "@loadable/component";
import { Loading } from "src/components/loading";

export const Loadable = loadableFactory<{ page: string }>(
  (props) => import(`src/pages/${props.page}/page`),
  {
    cacheKey: (props) => props.page,
    fallback: (
      <div className="self-center p-2 pt-8">
        <Loading />
      </div>
    ),
  },
) as React.FC<{ page: string }>;
