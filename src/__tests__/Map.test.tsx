import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Map from "../components/Posts/FullPost/Map";

describe("snapshot testing", () => {
  it("snapshot for map", () => {
    const mapComponent = renderer.create(<Map />).toJSON();
    expect(mapComponent).toMatchSnapshot();
  });
});

describe("render logic", () => {
  it("render logic for map", () => {
    render(<Map />);

    expect(screen.getByText("Where")).toBeInTheDocument();
    expect(screen.getByText("Marina Bay Sands")).toBeInTheDocument();
    expect(screen.getByText("10 Bayfront Ave, S018956")).toBeInTheDocument();
  });
});
