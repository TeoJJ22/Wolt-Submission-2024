import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import FeeDisplay from "../Components/FeeDisplay";

describe("FeeDisplay Component", () => {
  it("displays the calculated fee", () => {
    const mockFee = "10.00";
    render(<FeeDisplay calculatedFee={mockFee} />);
    expect(screen.getByText(/Your Fee:/i)).toHaveTextContent(
      `Your Fee: ${mockFee}`
    );
  });
});
