import './ExpenseItem.css';

import { MdClear, MdEdit } from 'react-icons/md';

const ExpenseItem = ({ expense, handleDelete, hanleEdit }) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{expense.charge}</span>
        <span className="amount">{expense.amount} 원</span>
      </div>
      <div>
        <button className="edit-btn" onClick={() => hanleEdit(expense.id)}>
          <MdEdit />
        </button>
        <button className="clear-btn" onClick={() => handleDelete(expense.id)}>
          <MdClear />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
