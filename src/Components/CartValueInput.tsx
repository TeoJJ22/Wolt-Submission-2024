import React from "react";
import "../Styles/Form.css";

interface InputProps {
  cartValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setError: (error: string) => void;
  error: string;
}

const CartValueInput: React.FC<InputProps> = ({
  cartValue,
  onChange,
  setError,
  error,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    let currentError = "";

    if (!input) {
      currentError = "Please enter value in euros";
    } else if (![...input].every((c) => "0123456789.".includes(c))) {
      currentError = "Invalid characters";
    } else if (input.split(".").length - 1 > 1) {
      currentError = "Please enter in format '123.45'";
    } else if (input.includes(".") && input.split(".")[1].length > 2) {
      currentError = "Please enter in format '123.45'";
    }

    setError(currentError);
    onChange(event);
  };

  return (
    <div className="input-group">
      <label htmlFor="cart-value">Cart Value:</label>
      <div className="input-wrapper">
        <input
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "cartValueError" : undefined}
          placeholder="15.20"
          type="text"
          autoComplete="off"
          value={cartValue}
          onChange={handleInputChange}
          id="cart-value"
          data-test-id="cartValue"
        />
        <span className="unit-symbol">€</span>
      </div>
      {error && (
        <span id="cartValueError" style={{ color: "red", fontSize: 19 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default CartValueInput;
