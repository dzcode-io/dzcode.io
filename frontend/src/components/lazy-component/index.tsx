import React, { useEffect, useState } from "react";
import { LoadingStatus } from "t9/types/fullstack";

export const LazyComponent = (props: LazyComponentProps) => {
  const [component, setComponent] = useState<JSX.Element>(props.placeholder);
  const [status, setStatus] = useState<LoadingStatus>("not-loaded");

  useEffect(() => {
    if (status === "not-loaded") {
      props
        .import()
        .then((jsModule) => {
          setStatus("loaded");
          setComponent(jsModule.default);
        })
        .catch(() => {
          setStatus("not-loaded");
        });
    }
  }, []);

  return component;
};

export interface LazyComponentProps {
  import: () => Promise<{ default: any }>;
  placeholder: () => JSX.Element;
  loadingStatus?: (status: LoadingStatus) => void;
}
