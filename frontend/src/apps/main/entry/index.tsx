import * as React from "react";
import { render } from "react-dom";
import "./style";

export const App: React.SFC<{}> = () => {
  return (
    <div>
      Hello World, dzCode is under development, expect cools things soon
    </div>
  );
};

render(<App />, document.getElementById("app-container"));
