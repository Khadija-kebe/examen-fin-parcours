import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../src/assets/images/budjet.svg';
const AjouterTransaction = ({ ajouterTransaction }) => {
  const [type, setType] = useState('revenue');
  const [category, setCategory] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nouvelleTransaction = {
      type,
      category,
      montant: parseFloat(montant), // Utilisez le champ 'montant'
      date
    };

    try {
      const response = await fetch('http://localhost:3000/transactions/ajout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouvelleTransaction)
      });

      if (response.ok) {
        const transactionAjoutee = await response.json();
        if (typeof ajouterTransaction === 'function') { // Vérifiez si ajouterTransaction est une fonction
          ajouterTransaction(transactionAjoutee);
        } else {
          console.error('ajouterTransaction n\'est pas une fonction');
        }
        navigate('/');
      } else {
        console.error('Erreur lors de l\'ajout de la transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la transaction:', error);
    }
  };

  return (
    <>
    <div className="logo flex justify-center">
        <img src={images} alt="Budget Logo" />
      </div>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <label className="block font-bold mb-2 text-[#0C5E69] p-2 rounded-md">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="revenue">Revenue</option>
          <option value="expense">Dépense</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-2 text-[#0C5E69] p-2 rounded-md">Catégorie:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-2 text-[#0C5E69] p-2 rounded-md">Montant:</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold mb-2 text-[#0C5E69] p-2 rounded-md">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#0C5E69] hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Ajouter la Transaction
      </button>
    </form>
    </>
  );
};

export default AjouterTransaction;
