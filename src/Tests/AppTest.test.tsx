import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("renders the App component without errors", () => {
    render(<App />);
    expect(screen.getByText(/Delivery Fee Calculator/i)).toBeInTheDocument();
  });

  it("updates state and displays fee on form submission", () => {
    render(<App />);
    const cartValueInput = screen.getByLabelText(/Cart Value:/i);
    const distanceInput = screen.getByLabelText(/Distance:/i);
    const itemCountInput = screen.getByLabelText(/Number Of Items/i);
    const dateInput = screen.getByLabelText(/Time Of Order/i);

    fireEvent.change(cartValueInput, { target: { value: "20" } });
    fireEvent.change(distanceInput, { target: { value: "1485" } });
    fireEvent.change(itemCountInput, { target: { value: "5" } });
    fireEvent.change(dateInput, { target: { value: "2024-01-31T17:05" } });

    const submitButton = screen.getByText(/Calculate Delivery Fee/);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Your Fee:/i)).toBeInTheDocument();
  });

  it("doesn't display the fee when first loaded", () => {
    render(<App />);
    expect(screen.queryByText(/Your Fee:/i)).not.toBeInTheDocument();
  });

  it("should keep the fee displayed even if input changed to invalid values", () => {
    render(<App />);
    const cartValueInput = screen.getByLabelText(/Cart Value:/i);
    const distanceInput = screen.getByLabelText(/Distance:/i);
    const itemCountInput = screen.getByLabelText(/Number Of Items/i);
    const dateInput = screen.getByLabelText(/Time Of Order/i);

    fireEvent.change(cartValueInput, { target: { value: "20" } });
    fireEvent.change(distanceInput, { target: { value: "1485" } });
    fireEvent.change(itemCountInput, { target: { value: "5" } });
    fireEvent.change(dateInput, { target: { value: "2024-01-31T17:05" } });

    const submitButton = screen.getByText(/Calculate Delivery Fee/);
    fireEvent.click(submitButton);

    fireEvent.change(cartValueInput, { target: { value: "test" } });
    fireEvent.change(distanceInput, { target: { value: "invalid" } });
    fireEvent.change(itemCountInput, { target: { value: "values" } });
    fireEvent.change(dateInput, { target: { value: "2024-01-31T17:05" } });

    expect(screen.getByText(/Your Fee:/i)).toBeInTheDocument();
  });
});

export {};
