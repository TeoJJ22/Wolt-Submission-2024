import React, { useState } from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Components/Form";

const MockApp = () => {
  const [cartValue, setCartValue] = useState("");
  const [distance, setDistance] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [date, setDate] = useState("");

  return (
    <Form
      cartValue={cartValue}
      handleCartValueChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setCartValue(e.target.value)
      }
      distance={distance}
      handleDistanceChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDistance(e.target.value)
      }
      itemCount={itemCount}
      handleItemCountChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setItemCount(e.target.value)
      }
      date={date}
      handleDateChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDate(e.target.value)
      }
    />
  );
};

describe("Form Component", () => {
  it("renders all form fields and the submit button", () => {
    render(<MockApp />);
    expect(screen.getByLabelText(/Cart Value:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distance:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number Of Items:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time Of Order:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Calculate Delivery Fee/i })
    ).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    render(<MockApp />);

    const cartValueInput = screen.getByLabelText(
      /Cart Value:/i
    ) as HTMLInputElement;
    const distanceInput = screen.getByLabelText(
      /Distance:/i
    ) as HTMLInputElement;
    const itemCountInput = screen.getByLabelText(
      /Number Of Items:/i
    ) as HTMLInputElement;
    const dateInput = screen.getByLabelText(
      /Time Of Order:/i
    ) as HTMLInputElement;

    fireEvent.change(cartValueInput, { target: { value: "10" } });
    fireEvent.change(distanceInput, { target: { value: "1200" } });
    fireEvent.change(itemCountInput, { target: { value: "10" } });
    fireEvent.change(dateInput, { target: { value: "2024-01-31T17:05" } });

    expect(cartValueInput.value).toBe("10");
    expect(distanceInput.value).toBe("1200");
    expect(itemCountInput.value).toBe("10");
    expect(dateInput.value).toBe("2024-01-31T17:05");
  });

  it("enables the submit button when the form is valid", () => {
    render(<MockApp />);

    fireEvent.change(screen.getByLabelText(/Cart Value:/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Distance:/i), {
      target: { value: "1200" },
    });
    fireEvent.change(screen.getByLabelText(/Number Of Items:/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Time Of Order:/i), {
      target: { value: "2024-01-01T17:05" },
    });

    const submitButton = screen.getByRole("button", {
      name: /Calculate Delivery Fee/i,
    });
    expect(submitButton).toBeEnabled();
  });

  it("disables the submit button when the form is invalid", () => {
    render(<MockApp />);

    fireEvent.change(screen.getByLabelText(/Cart Value:/i), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText(/Distance:/i), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByLabelText(/Number Of Items:/i), {
      target: { value: "input" },
    });
    fireEvent.change(screen.getByLabelText(/Time Of Order:/i), {
      target: { value: "" },
    });

    const submitButton = screen.getByRole("button", {
      name: /Calculate Delivery Fee/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it("is accessible and correctly labeled", () => {
    render(<MockApp />);

    const cartValueInput = screen.getByLabelText(/Cart Value:/i);
    const distanceInput = screen.getByLabelText(/Distance:/i);
    const itemCountInput = screen.getByLabelText(/Number Of Items:/i);
    const dateInput = screen.getByLabelText(/Time Of Order:/i);

    expect(cartValueInput).toHaveAttribute("aria-invalid", "false");
    expect(distanceInput).toHaveAttribute("aria-invalid", "false");
    expect(itemCountInput).toHaveAttribute("aria-invalid", "false");
    expect(dateInput).toHaveAttribute("aria-invalid", "false");

    expect(cartValueInput).not.toHaveAttribute("aria-describedby");
    expect(distanceInput).not.toHaveAttribute("aria-describedby");
    expect(itemCountInput).not.toHaveAttribute("aria-describedby");
    expect(dateInput).not.toHaveAttribute("aria-describedby");

    expect(cartValueInput).not.toHaveAttribute("aria-describedby");
    expect(distanceInput).not.toHaveAttribute("aria-describedby");
    expect(itemCountInput).not.toHaveAttribute("aria-describedby");
    expect(dateInput).not.toHaveAttribute("aria-describedby");

    fireEvent.change(cartValueInput, { target: { value: "test" } });
    fireEvent.change(distanceInput, { target: { value: "test" } });
    fireEvent.change(itemCountInput, { target: { value: "test" } });
    fireEvent.change(dateInput, { target: { value: "3333-01-31T17:05" } });

    expect(cartValueInput).toHaveAttribute("aria-invalid", "true");
    expect(distanceInput).toHaveAttribute("aria-invalid", "true");
    expect(itemCountInput).toHaveAttribute("aria-invalid", "true");
    expect(dateInput).toHaveAttribute("aria-invalid", "true");

    expect(cartValueInput).toHaveAttribute("data-test-id", "cartValue");
    expect(distanceInput).toHaveAttribute("data-test-id", "deliveryDistance");
    expect(itemCountInput).toHaveAttribute("data-test-id", "numberOfItems");
    expect(dateInput).toHaveAttribute("data-test-id", "orderTime");
  });
});

export {};
