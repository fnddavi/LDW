import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import { deleteCustomer, getCustomers } from './services/customerService';
import { CustomerState } from './types/Types';
import './App.css';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerState[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error('Failed to delete customer', error);
    }
  };

  return (
    <div className="container">
      <div className="header-box">
        <h1>Gerenciamento de Clientes</h1>
      </div>
      <CustomerForm onCustomerAdded={setCustomers} />
      <CustomerList customers={customers} onDelete={handleDelete} />
    </div>
  );
};

export default App;
