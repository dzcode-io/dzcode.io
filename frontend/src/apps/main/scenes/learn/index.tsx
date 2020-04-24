import React from "react";
import { Sidebar } from "./sidebar";
import { Content } from "./content";

export default () => {
  return (
    <div className="learn">
      <Sidebar />
      <Content />
    </div>
  );
};
