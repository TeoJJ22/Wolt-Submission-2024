import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DistanceInput from "../Components/DistanceInput";

describe("DistanceInput", () => {
  const mockOnChange = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    render(
      <DistanceInput
        distance=""
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
        screen.queryByText("Please enter distance")
      ).not.toBeInTheDocument();
    });

    it("displays invalid character errors when input has letters", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      expect(mockSetError).toHaveBeenCalledWith("Invalid characters");
    });

    it("displays invalid character errors when input has symbols", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "@!=?" },
      });
      expect(mockSetError).toHaveBeenCalledWith("Invalid characters");
    });

    it("displays invalid character errors when input is number + letter", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "a" },
      });
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "7" },
      });
      expect(mockSetError).toHaveBeenCalledWith("Invalid characters");
    });

    it("doesn't display error when input has a period '.'", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "12.3" },
      });
      expect(mockSetError).toHaveBeenCalledWith("");
    });

    it("asks for right format when input has two periods", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "12.3.2" },
      });
      expect(mockSetError).toHaveBeenCalledWith(
        "Please enter in format '123.45'"
      );
    });

    it("asks for right format when input has 3 digits after period", () => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "12.312" },
      });
      expect(mockSetError).toHaveBeenCalledWith(
        "Please enter in format '123.45'"
      );
    });
  });
});

export {};
