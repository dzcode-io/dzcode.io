import { loadableFactory } from "@dzcode.io/ui/dist/loadable-factory";

export const L = loadableFactory<{ page: string }>((props) => import(`src/pages/${props.page}`), {
  cacheKey: (props) => props.page,
});
