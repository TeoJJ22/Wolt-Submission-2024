const CalculateFee = (
  cartValue: number,
  distance: number,
  itemCount: number,
  date: Date
) => {
  let result = 2;
  const day = date.getDay();
  const hour = date.getHours();

  if (cartValue < 10) result += 10 - cartValue;
  if (distance > 1000) result += Math.ceil((distance - 1000) / 500);
  if (itemCount > 4) result += 0.5 * (itemCount - 4);
  if (itemCount > 12) result += 1.2;
  if (day === 5 && hour >= 15 && hour < 19) result *= 1.2;
  if (result > 15) result = 15;
  if (cartValue >= 200) result = 0;

  return result.toFixed(2);
};

export default CalculateFee;
