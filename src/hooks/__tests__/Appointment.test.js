import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  test("renders without crashing", () => {
    render(<Application />);
  });
});
