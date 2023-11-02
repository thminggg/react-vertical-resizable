import React from "react";
import { render, screen } from "@testing-library/react";
import VerticalResizable from "../src/VerticalResizable";

describe("VerticalResizable", () => {
  it("should render child component", async () => {
    render(
      <VerticalResizable>
        <p>Testing Child</p>
      </VerticalResizable>
    );

    await screen.debug();
    await screen.findAllByText("Testing Child");
  });
});
