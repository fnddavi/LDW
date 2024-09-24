import { CustomerState } from "../types/Types";
import "./CustomerList.css";

interface CustomerListProps {
    customers: CustomerState[];
    onDelete: (id: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onDelete }) => {
    return (
        <div className="customer-list-container">
            <ul className="customer-list">
                {customers.map(customer => (
                    <li key={customer._id} className="customer-list-item">
                        <span className="customer-info">
                            {customer.name} - {customer.email} - {customer.phone}
                        </span>
                        <button className="delete-button" onClick={() => onDelete(customer._id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
