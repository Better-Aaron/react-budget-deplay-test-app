import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const App = () => {
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 1600 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 },
  ]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge === '' || amount <= 0) {
      handleAlert({ type: 'danger', text: '지출 항목, 비용을 입력해주세요.' });
      return;
    }

    if (edit) {
      const newExpenses = expenses.map((item) => {
        return item.id === id ? { ...item, charge, amount } : item;
      });
      setEdit(false);
      setExpenses(newExpenses);
      handleAlert({ type: 'suecess', text: '아이템이 수정되었습니다.' });
    } else {
      const newExpense = { id: crypto.randomUUID(), charge, amount };
      const newExpenses = [newExpense, ...expenses];
      setExpenses(newExpenses);
      handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' });
    }
    setCharge('');
    setAmount(0);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' });
  };

  const handleClearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: '아이템이 모두 삭제되었습니다.' });
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const hanleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          hanleEdit={hanleEdit}
          handleClearItems={handleClearItems}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>
          총지출 : <span>{expenses.reduce((acc, curr) => (acc += curr.amount), 0)}원</span>
        </p>
      </div>
    </main>
  );
};

export default App;
