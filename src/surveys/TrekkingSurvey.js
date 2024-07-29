// src/surveys/TrekkingSurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';

const TrekkingSurvey = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    zona: '',
    esperienza: '',
    abilita: '',
    caratteristiche: '',
    giorni: '',
    durata: '',
    carpooling: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, 'TrekkingSurvey');
      await addDoc(collectionRef, formData);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('Error submitting survey. Please try again.');
    }
  };

  return (
    <div className="survey-container">
      <h1>Trekking Survey</h1>
      <form onSubmit={handleSubmit} className="survey-form">
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cognome" placeholder="Cognome" onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Telefono" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <select name="zona" onChange={handleChange} required>
          <option value="">Seleziona Zona</option>
          <option value="Verbania">zona di Verbania</option>
          <option value="Lecco">zona di Lecco</option>
          <option value="Varese">sopra Varese e lago di Lugano</option>
          <option value="Valtellina">la Valtellina</option>
        </select>
        <input type="text" name="esperienza" placeholder="Esperienza" onChange={handleChange} required />
        <select name="abilita" onChange={handleChange} required>
          <option value="">Seleziona Livello</option>
          <option value="Principiante">Principiante</option>
          <option value="Medio">Medio</option>
          <option value="Avanzato">Avanzato</option>
        </select>
        <input type="text" name="caratteristiche" placeholder="Caratteristiche" onChange={handleChange} required />
        <input type="text" name="giorni" placeholder="Giorni preferiti" onChange={handleChange} required />
        <input type="text" name="durata" placeholder="Durata" onChange={handleChange} required />
        <select name="carpooling" onChange={handleChange} required>
          <option value="">Carpooling?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TrekkingSurvey;
