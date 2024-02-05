import React, { useState } from "react";
import CartValueInput from "./CartValueInput";
import DistanceInput from "./DistanceInput";
import DateInput from "./DateInput";
import ItemCountInput from "./ItemCountInput";
import "../Styles/Form.css";

const Form = ({ ...props }) => {
  const [cartValueError, setCartValueError] = useState("");
  const [distanceError, setDistanceError] = useState("");
  const [itemCountError, setItemCountError] = useState("");
  const [dateError, setDateError] = useState("");

  const isFormValid = () => {
    return (
      props.cartValue &&
      !cartValueError &&
      props.distance &&
      !distanceError &&
      props.itemCount &&
      !itemCountError &&
      props.date &&
      !dateError
    );
  };

  return (
    <form onSubmit={props.onSubmit} className="form">
      <CartValueInput
        setError={setCartValueError}
        error={cartValueError}
        cartValue={props.cartValue}
        onChange={props.handleCartValueChange}
      />
      <br />
      <DistanceInput
        setError={setDistanceError}
        error={distanceError}
        distance={props.distance}
        onChange={props.handleDistanceChange}
      />
      <br />
      <ItemCountInput
        setError={setItemCountError}
        error={itemCountError}
        itemCount={props.itemCount}
        onChange={props.handleItemCountChange}
      />
      <br />
      <DateInput
        setError={setDateError}
        error={dateError}
        date={props.date}
        onChange={props.handleDateChange}
      />
      <br />
      <button type="submit" disabled={!isFormValid()}>
        Calculate Delivery Fee
      </button>
    </form>
  );
};

export default Form;
