import React from 'react';
import images from '../src/assets/images/budjet.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Budjet = () => {
    const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    fetch('http://localhost:3000/transactions/summary')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const [transactions, setTransactions] = useState([]);
  

  useEffect(() => {
   
    fetch('http://localhost:3000/transactions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  async function supprimerTransaction(id) {
    try {
      const url = `http://localhost:3000/transactions/${id}`;
      const response = await fetch(url, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        const nouvelleListe = transactions.filter(transaction => transaction.id !== id);
        setTransactions(nouvelleListe);
      } else {
        console.error('Erreur lors de la suppression:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la transaction:', error);
    }
  }
  
  return (
    <>
      <div className="logo flex justify-center">
        <img src={images} alt="Budget Logo" />
      </div>
      <div className="flex justify-center">
        <div className="contain">
          <div className="depenses flex gap-40 text-center items-center">
            <div className="w-52 h-24 bg-white shadow-md">
              <div className="bg-[#0C5E69] h-8 text-center text-white">Budget</div>
              <span className="block mt-4 text-sm">{summary.balance}</span>
            </div>
            <div className="w-52 h-24 bg-white shadow-md">
              <div className="bg-[#0C5E69] h-8 text-center text-white">Depenses</div>
              <span className="block mt-4 text-sm">{summary.totalExpense}</span>
            </div>
            <div className="w-52 h-24 bg-white shadow-md">
              <div className="bg-[#0C5E69] h-8 text-center text-white">Solde</div>
              <span className="block mt-4 text-sm">{summary.totalRevenue}</span>
            </div>
          </div>

         
          <div className="overflow-x-auto mt-14">
  <h1 className='text-xl mb-6 text-[#D1C000]'>listes des transactions</h1>
  <table className="min-w-full bg-white border border-gray-200">
    <thead>
      <tr className="text-left">
        <th className="py-3 px-4 bg-[#0C5E69] text-white">Type</th>
        <th className="py-3 px-4 bg-[#0C5E69] text-white">Category</th>
        <th className="py-3 px-4 bg-[#0C5E69] text-white">Montant</th>
        <th className="py-3 px-4 bg-[#0C5E69] text-white">Date</th>
        <th className="py-3 px-4 bg-[#0C5E69] text-white">Action</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => (
        <tr key={transaction.id}>
          <td className="py-2 px-4 text-sm">{transaction.type === 'revenue' ? 'Revenue' : 'Dépense'}</td>
          <td className="py-2 px-4 text-sm">{transaction.category}</td>
          <td className="py-2 px-4 text-sm">{transaction.montant}</td>
          <td className="py-2 px-4 text-sm">{transaction.date}</td>
          <td className="py-2 px-4 text-sm">
            <Link to={`/modifier/${transaction.id}`}>
            <button className="bg-[#D1C000] text-white px-4 py-1 rounded">Edit</button>
            </Link>
            <button onClick={() => supprimerTransaction(transaction.id)} className="bg-red-500 text-white px-4 py-1 rounded ml-2">Delete</button>
          </td>
        </tr>
      ))}
      <tr>
        <td className="py-2 px-4 text-sm">
          <div className="flex items-center text-blue-500 cursor-pointer">
            <span className='text-[#D1C000]'>Ajouter Dépense ou Revenue</span>
           <Link to='/ajouter'>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#D1C000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
           </Link> 
          </div>
        </td>
        <td className="py-2 px-4 text-sm" colSpan="4"></td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
      </div>
    </>
  );
};

export default Budjet;
