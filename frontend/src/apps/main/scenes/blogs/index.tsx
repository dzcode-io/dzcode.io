import React from "react";
import { Sidebar } from "./sidebar";
import { Content } from "./content";
import { connect } from "react-redux";

export const BlogsScene = (props: any) => {
  return (
    <div className="blogs">
      <Sidebar />
      <Content />
    </div>
  );
};

export default connect()(BlogsScene);
