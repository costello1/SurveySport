// src/surveys/RunningSurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/Survey.css'; // Assicurati di avere il file CSS

const RunningSurvey = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    mail: '',
    cell: '',
    kmSettimana: '',
    prestazioni: '',
    distanze: '',
    giorni: '',
    orario: '',
    manifestazioni: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, 'RunningSurvey');
      await addDoc(collectionRef, formData);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('Error submitting survey. Please try again.');
    }
  };

  return (
    <div className="survey-container">
      <h1>Running Survey</h1>
      <form onSubmit={handleSubmit} className="survey-form">
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cognome" placeholder="Cognome" onChange={handleChange} required />
        <input type="email" name="mail" placeholder="Mail" onChange={handleChange} required />
        <input type="text" name="cell" placeholder="Cell" onChange={handleChange} required />
        <select name="kmSettimana" onChange={handleChange} required>
          <option value="">Select KM per week</option>
          <option value="<40">Inferiore a 40 Km / Settimana</option>
          <option value="40-60">40 Km – 60 Km / Settimana</option>
          <option value=">60">Avanzato Superiore 60 Km / Settimana</option>
        </select>
        <input type="text" name="prestazioni" placeholder="Come misuri le tue prestazioni" onChange={handleChange} required />
        <input type="text" name="distanze" placeholder="Distanze percorse" onChange={handleChange} required />
        <input type="text" name="giorni" placeholder="Giorni preferiti" onChange={handleChange} required />
        <input type="text" name="orario" placeholder="Orario preferito" onChange={handleChange} required />
        <select name="manifestazioni" onChange={handleChange} required>
          <option value="">Parteciperesti a manifestazioni sportive?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RunningSurvey;
