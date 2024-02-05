import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCountInput from "../Components/ItemCountInput";

describe("ItemCountInput", () => {
  const mockOnChange = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    render(
      <ItemCountInput
        itemCount=""
        onChange={mockOnChange}
        setError={mockSetError}
        error=""
      />
    );
    mockOnChange.mockClear();
    mockSetError.mockClear();
  });

  describe("Error Handling", () => {
    it("doesnt display error on empty field when first loaded", () => {
      expect(
        screen.queryByText("Please enter a value")
      ).not.toBeInTheDocument();
    });

    it("asks for a positive integer if input has letters", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(mockSetError).toHaveBeenCalledWith(
        "Please enter a positive integer"
      );
    });

    it("asks for a positive integer if input has symbols", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "@!=?" },
      });
      expect(mockSetError).toHaveBeenCalledWith(
        "Please enter a positive integer"
      );
    });

    it("asks for a positive integer if input has number + letter", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "a7" },
      });
      expect(mockSetError).toHaveBeenCalledWith(
        "Please enter a positive integer"
      );
    });
  });
});

export {};
