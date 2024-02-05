import React from "react";

interface InputProps {
  itemCount: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setError: (error: string) => void;
  error: string;
}

const ItemCountInput: React.FC<InputProps> = ({
  itemCount,
  onChange,
  setError,
  error,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value;
    let currentError = "";

    if (!input) {
      currentError = "Please enter the amount of items";
    }

    if (![...input].every((c) => "0123456789".includes(c))) {
      currentError = "Please enter a positive integer";
    }

    setError(currentError);
    onChange(event);
  };

  return (
    <div className="input-group">
      <label htmlFor="item-count">Number Of Items: </label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "itemCountError" : undefined}
        placeholder="3"
        autoComplete="off"
        type="text"
        value={itemCount}
        onChange={handleInputChange}
        id="item-count"
        data-test-id="numberOfItems"
      />
      {error && (
        <span id="itemCountError" style={{ color: "red", fontSize: 19 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default ItemCountInput;
