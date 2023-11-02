declare module "@thminggg/react-vertical-resizable" {
  import React, { ReactNode } from "react";

  interface VerticalResizableProps {
    children: ReactNode;
  }

  const VerticalResizable: React.FC<VerticalResizableProps>;

  export { VerticalResizable };
}
