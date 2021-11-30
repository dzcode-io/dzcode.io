import { CacheProvider } from "@emotion/react";
import { Direction } from "@mui/system";
import { FC } from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin as any],
});

const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [],
});

interface Props {
  direction: Direction;
}

export const PluginsProvider: FC<Props> = ({ children, direction }) => {
  return (
    <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
      {children}
    </CacheProvider>
  );
};
