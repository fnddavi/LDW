import axios from "axios";

const API_URL = "http://localhost:5000/customers";

export const getCustomers = async () => {
  return await axios.get(API_URL);
};

export const createCustomer = async (customer: {
  name: string;
  email: string;
  phone: string;
}) => {
  return await axios.post(API_URL, customer);
};

export const updateCustomer = async (
  id: string,
  customer: { name: string; email: string; phone: string }
) => {
  return await axios.put(`${API_URL}/${id}`, customer);
};

export const deleteCustomer = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};
