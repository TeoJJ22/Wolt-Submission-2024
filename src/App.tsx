import React, { useState } from "react";
import "./Styles/App.css";
import Form from "./Components/Form";
import FeeDisplay from "./Components/FeeDisplay";
import CalculateFee from "./Utils/CalculateFee";

const App = () => {
  const [cartValue, setCartValue] = useState("");
  const [distance, setDistance] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedFee, setCalculatedFee] = useState("");

  const handleCartValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCartValue(event.target.value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value);
  };

  const handleItemCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemCount(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setCalculatedFee(CalculateFee(
      parseFloat(cartValue), 
      parseFloat(distance), 
      parseFloat(itemCount), 
      new Date(date)
    ));
  };

  return (
    <div className="app-container">
      <div className="title-container">
        <h1>Delivery Fee Calculator</h1>
      </div>
      <div className="form-container">
        <Form
          cartValue={cartValue}
          distance={distance}
          itemCount={itemCount}
          date={date}
          handleCartValueChange={handleCartValueChange}
          handleDistanceChange={handleDistanceChange}
          handleItemCountChange={handleItemCountChange}
          handleDateChange={handleDateChange}
          onSubmit={handleSubmit}
        />
      </div>
      {isSubmitted && (
        <div className="display-fee">
          <FeeDisplay
            calculatedFee={calculatedFee}
          />
        </div>
      )}
    </div>
  );
};

export default App;
