import { Schema, model } from "mongoose";

interface ICustomer {
  name: string;
  email: string;
  phone: string;
}

const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export const Customer = model<ICustomer>("Customer", customerSchema);
