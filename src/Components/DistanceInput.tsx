import React from "react";
import "../Styles/Form.css";

interface InputProps {
  distance: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setError: (error: string) => void;
  error: string;
}

const DistanceInput: React.FC<InputProps> = ({
  distance,
  onChange,
  setError,
  error,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    let currentError = "";

    if (!input) {
      currentError = "Please enter distance in meters";
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
      <label htmlFor="distance">Delivery Distance: </label>
      <div className="input-wrapper">
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "distanceError" : undefined}
        placeholder="1400"
        type="text"
        autoComplete="off"
        value={distance}
        onChange={handleInputChange}
        id="distance"
        data-test-id="deliveryDistance"
      />
      <span className="unit-symbol">m</span>
      </div>
      {error && (
        <span id="distanceError" style={{ color: "red", fontSize: 19 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default DistanceInput;
