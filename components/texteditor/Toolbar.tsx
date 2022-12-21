import React, { ReactNode } from "react";

type ToolbarProps = {
  children: ReactNode;
};

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="toolbar-container">
      <ul>{children}</ul>
    </div>
  );
};
