import { MdDelete } from 'react-icons/md';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = ({ handleDelete, expenses, hanleEdit, handleClearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return <ExpenseItem expense={expense} key={expense.id} handleDelete={handleDelete} hanleEdit={hanleEdit} />;
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleClearItems}>
          목록 지우기 <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
