import "./style";
import React from "react";
import { Typography } from "@material-ui/core";

export const HowToContribute = () => (
  <section className="how_to_contribute">
    <Typography variant="h1">Contribute to dzCode.io</Typography>
    <div className="items">
      <div className="item">1. Chose a project that you like.</div>
      <div className="item">2. Clone the repository.</div>
      <div className="item">3. Start coding!.</div>
    </div>
  </section>
);
