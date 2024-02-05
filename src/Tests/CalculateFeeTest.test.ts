import CalculateFee from "../Utils/CalculateFee";

describe("CalculateFee function", () => {
  it("charges a base fee of 2€ when no conditions are met", () => {
    expect(CalculateFee(10, 0, 0, new Date("2024-02-01T10:00:00"))).toBe(
      "2.00"
    );
  });

  it("charges an extra fee of 1€ for 1001m", () => {
    expect(CalculateFee(10, 1001, 0, new Date("2024-02-01T10:00:00"))).toBe(
      "3.00"
    );
  });

  it("charges an extra fee of 1€ for 1500m", () => {
    expect(CalculateFee(10, 1001, 0, new Date("2024-02-01T10:00:00"))).toBe(
      "3.00"
    );
  });

  it("charges the correct subcharge for less than 10€ orders", () => {
    expect(CalculateFee(6.6, 0, 0, new Date("2024-02-01T10:00:00"))).toBe(
      "5.40"
    );
  });

  it("charges the subcharge first, then adds extra delivery costs", () => {
    expect(CalculateFee(6.6, 1750, 0, new Date("2024-02-01T10:00:00"))).toBe(
      "7.40"
    );
  });

  it("no extra fee for 4 items", () => {
    expect(CalculateFee(6.6, 1750, 4, new Date("2024-02-01T10:00:00"))).toBe(
      "7.40"
    );
  });

  it("0.5€ fee for 5 items", () => {
    expect(CalculateFee(6.6, 1750, 5, new Date("2024-02-01T10:00:00"))).toBe(
      "7.90"
    );
  });

  it("4€ (0.5€ * 8) fee for 12 items", () => {
    expect(CalculateFee(6.6, 1750, 12, new Date("2024-02-01T10:00:00"))).toBe(
      "11.40"
    );
  });

  it("6.20€ (0.5€ * 10) + 1.20$ bulk fee for 14 items", () => {
    expect(CalculateFee(12, 500, 14, new Date("2024-02-01T10:00:00"))).toBe(
      "8.20"
    );
  });

  it("maximum 15€ fee for 40 items", () => {
    expect(CalculateFee(12, 500, 40, new Date("2024-02-01T10:00:00"))).toBe(
      "15.00"
    );
  });

  it("2.40€ for base delivery fee at rush hour", () => {
    expect(CalculateFee(12, 500, 0, new Date("2024-02-02T16:00:00"))).toBe(
      "2.40"
    );
  });

  it("base delivery fee + minimum order subcharge at rush hour", () => {
    expect(CalculateFee(6, 500, 0, new Date("2024-02-02T16:00:00"))).toBe(
      "7.20"
    );
  });

  it("2km delivery fee + minimum order subcharge at rush hour", () => {
    expect(CalculateFee(6, 2000, 0, new Date("2024-02-02T16:00:00"))).toBe(
      "9.60"
    );
  });

  it("14.20€ + rush hour does not exceed the 15€ maximum", () => {
    expect(CalculateFee(6, 2000, 14, new Date("2024-02-02T16:00:00"))).toBe(
      "15.00"
    );
  });

  it("above 200€ order is free delivery", () => {
    expect(CalculateFee(200, 2000, 14, new Date("2024-02-02T16:00:00"))).toBe(
      "0.00"
    );
  });
});

export {};
