import React from "react";
import logoSquare from "src/assets/svg/logo-square.svg";

import { Image } from "./image";

export function Loading(): JSX.Element {
  return (
    <div className="absolute-center-child size-52">
      <Image src={logoSquare} alt="DzCode i /o loading..." />
      <span className="loading loading-ring"></span>
    </div>
  );
}
