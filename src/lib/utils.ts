import { clsx } from "clsx";

export const cn = (...inputs: Array<string | boolean | undefined | null>) => clsx(inputs);

export const calculateRentalPrice = (daysSelected: number, pricePerDay: number) => {
  if (daysSelected <= 0 || pricePerDay < 0) {
    throw new Error("Invalid pricing inputs");
  }
  return Number((daysSelected * pricePerDay).toFixed(2));
};
