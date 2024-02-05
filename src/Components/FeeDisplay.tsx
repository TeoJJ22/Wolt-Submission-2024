import React from "react";

interface InputProps {
  calculatedFee: string;
}

const FeeDisplay: React.FC<InputProps> = ({ calculatedFee }) => {
  return (
    <>
      <h1 data-test-id="fee">Your Fee: {calculatedFee}€</h1>
    </>
  );
};

export default FeeDisplay;
