import React from "react";
import "../Styles/Form.css";

interface DateInputProps {
  date: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setError: (error: string) => void;
  error: string;
}

const DateInput: React.FC<DateInputProps> = ({
  date,
  onChange,
  setError,
  error,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentError = "";
    let input: Date = new Date(event.target.value);
    const earliestDate = new Date("2015-01-01T00:00:00");
    const latestDate = new Date("2100-01-01T00:00:00");

    if (input < earliestDate) {
      currentError = "Please enter a date after 2015";
    } else if (input >= latestDate) {
      currentError = "Please enter a date before 2100";
    }
    setError(currentError);
    onChange(event);
  };

  return (
    <div className="input-group">
      <label htmlFor="date">Time Of Order: </label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "dateError" : undefined}
        placeholder="2015-01-01T00:00"
        style={{ marginLeft: -55 }}
        type="datetime-local"
        value={date}
        onChange={handleInputChange}
        id="date"
        data-test-id="orderTime"
        max="9999-12-31T23:59"
      />
      {error && (
        <span id="dateError" style={{ color: "red", fontSize: 19 }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default DateInput;
