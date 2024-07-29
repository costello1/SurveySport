// src/surveys/PadelSurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';

const PadelSurvey = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    zona: '',
    squadra: '',
    abilita: '',
    corso: '',
    composizione: '',
    giorni: '',
    orario: '',
    ruolo: '',
    carpooling: '',
    torneo: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, 'PadelSurvey');
      await addDoc(collectionRef, formData);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('Error submitting survey. Please try again.');
    }
  };

  return (
    <div className="survey-container">
      <h1>Padel Survey</h1>
      <form onSubmit={handleSubmit} className="survey-form">
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cognome" placeholder="Cognome" onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Telefono" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="zona" placeholder="Zona" onChange={handleChange} required />
        <input type="text" name="squadra" placeholder="Squadra" onChange={handleChange} required />
        <select name="abilita" onChange={handleChange} required>
          <option value="">Seleziona Livello</option>
          <option value="Principiante">Principiante</option>
          <option value="Medio">Medio</option>
          <option value="Avanzato">Avanzato</option>
        </select>
        <select name="corso" onChange={handleChange} required>
          <option value="">Parteciperesti a un corso?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <input type="text" name="composizione" placeholder="Composizione delle squadre" onChange={handleChange} required />
        <input type="text" name="giorni" placeholder="Giorni preferiti" onChange={handleChange} required />
        <input type="text" name="orario" placeholder="Orario preferito" onChange={handleChange} required />
        <select name="ruolo" onChange={handleChange} required>
          <option value="">Ruolo di preferenza</option>
          <option value="destra">Destra</option>
          <option value="sinistra">Sinistra</option>
          <option value="indifferente">Indifferente</option>
        </select>
        <select name="carpooling" onChange={handleChange} required>
          <option value="">Carpooling?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <select name="torneo" onChange={handleChange} required>
          <option value="">Parteciperesti a un torneo?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PadelSurvey;
