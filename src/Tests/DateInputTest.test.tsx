import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DateInput from "../Components/DateInput";

describe("DateInput", () => {
  const mockOnChange = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    render(
      <DateInput
        date=""
        onChange={mockOnChange}
        setError={mockSetError}
        error=""
      />
    );
    mockOnChange.mockClear();
    mockSetError.mockClear();
  });

  describe("Error Handling", () => {
    it("doesn't display error on empty field when first loaded", () => {
      expect(screen.queryByText("Please enter a date")).not.toBeInTheDocument();
    });

    it("asks for a date before 2100", () => {
      fireEvent.change(screen.getByLabelText("Time Of Order:"), {
        target: { value: "3333-01-31T17:05" },
      });
      expect(mockSetError).toHaveBeenCalledWith(
        "Please enter a date before 2100"
      );
    });

    it("asks for a date after 2015", () => {
     fireEvent.change(screen.getByLabelText("Time Of Order:"), {
       target: { value: "2000-01-31T17:05" },
     });
     expect(mockSetError).toHaveBeenCalledWith(
       "Please enter a date after 2015"
     );
   });
  });
});

export {};
