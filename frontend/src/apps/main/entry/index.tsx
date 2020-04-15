import * as React from "react";
import { render } from "react-dom";
import "./style";

export const App: React.SFC<{}> = () => {
  return <div>Helo World</div>;
};

render(<App />, document.getElementById("app-container"));
