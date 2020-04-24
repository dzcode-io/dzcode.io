import React from "react";
import { Sidebar } from "./sidebar";
import { Content } from "./content";

export default () => {
  return (
    <div className="blogs">
      <Sidebar />
      <Content />
    </div>
  );
};
