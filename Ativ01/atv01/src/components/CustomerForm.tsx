import { useReducer, FormEvent } from 'react';
import { createCustomer, getCustomers } from '../services/customerService';
import './CustomerForm.css';
import { CustomerState } from '../types/Types';

interface CustomerFormProps {
    onCustomerAdded: (customers: CustomerState[]) => void;
}

const initialState: CustomerState = {
    _id: '',
    name: '',
    email: '',
    phone: ''
};

type Action =
    | { type: 'SET_FIELD', field: keyof CustomerState, value: string }
    | { type: 'RESET_FORM' };

const reducer = (state: CustomerState, action: Action): CustomerState => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

const CustomerForm: React.FC<CustomerFormProps> = ({ onCustomerAdded }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, email, phone } = state;

    const handleChange = (field: keyof CustomerState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_FIELD', field, value: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createCustomer({ name, email, phone });
            dispatch({ type: 'RESET_FORM' });

            // Após adicionar o cliente, buscar a lista atualizada
            const response = await getCustomers();
            onCustomerAdded(response.data); // Atualiza a lista de clientes
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    return (
        <form className="customer-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-input"
                placeholder="Nome"
                value={name}
                onChange={handleChange('name')}
            />
            <input
                type="email"
                className="form-input"
                placeholder="Email"
                value={email}
                onChange={handleChange('email')}
            />
            <input
                type="text"
                className="form-input"
                placeholder="Telefone"
                value={phone}
                onChange={handleChange('phone')}
            />
            <button type="submit" className="submit-button">
                Adicionar Cliente
            </button>
        </form>
    );
};

export default CustomerForm;
