import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Budjet from "./budjet";
import AjouterTransaction from "./ajouter";
import ModifierTransaction from "./update";
function App() {
  const [transactions, setTransactions] = useState([]);

  const ajouterTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Budjet transactions={transactions} />} />
        <Route path="/ajouter" element={<AjouterTransaction ajouterTransaction={ajouterTransaction} />} />
        <Route path="/modifier/:id" element={<ModifierTransaction updateTransaction={updateTransaction} />} />
      </Routes>
    </>
  );
}

export default App;
