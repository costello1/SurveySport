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
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        <input type="email" name="mail" placeholder="Email (aziendale se disponibile o privata)" onChange={handleChange} required />
        <input type="text" name="cell" placeholder="Telefono (aziendale se disponibile o privato)" onChange={handleChange} required />
        <select name="kmSettimana" onChange={handleChange} required>
          <option value="">Seleziona KM percorsi a settimana</option>
          <option value="<40">Inferiore a 40 Km / Settimana</option>
          <option value="40-60">40 Km – 60 Km / Settimana</option>
          <option value=">60">Avanzato Superiore 60 Km / Settimana</option>
        </select>
        <select name="prestazioni" onChange={handleChange} required>
          <option value="">Come misuri le tue prestazioni</option>
          <option value="Fascia cardio">Fascia cardio (e.g. zone % Max HR)</option>
          <option value="Passo al Km">Passo al Km (e.g. passo target di 5:30-5:40 / Km)</option>
          <option value="Corsa Libera">Corsa Libera</option>
        </select>
        <fieldset>
          <legend>Distanze percorse</legend>
          <label>
            <input type="checkbox" name="distanze" value="<5" onChange={handleChange} /> sotto i 5 km
          </label>
          <label>
            <input type="checkbox" name="distanze" value="5-12" onChange={handleChange} /> 5 - 12 km
          </label>
          <label>
            <input type="checkbox" name="distanze" value="12-20" onChange={handleChange} /> 12 - 20 km
          </label>
        </fieldset>
        <fieldset>
          <legend>Giorni preferiti</legend>
          <label>
            <input type="checkbox" name="giorni" value="lunedì" onChange={handleChange} /> lunedì
          </label>
          <label>
            <input type="checkbox" name="giorni" value="martedì" onChange={handleChange} /> martedì
          </label>
          <label>
            <input type="checkbox" name="giorni" value="mercoledì" onChange={handleChange} /> mercoledì
          </label>
          <label>
            <input type="checkbox" name="giorni" value="giovedì" onChange={handleChange} /> giovedì
          </label>
          <label>
            <input type="checkbox" name="giorni" value="venerdì" onChange={handleChange} /> venerdì
          </label>
        </fieldset>
        <fieldset>
          <legend>Orario preferito</legend>
          <label>
            <input type="checkbox" name="orario" value="prima del turno lavorativo" onChange={handleChange} /> prima del turno lavorativo
          </label>
          <label>
            <input type="checkbox" name="orario" value="alla fine della giornata lavorativa" onChange={handleChange} /> alla fine della giornata lavorativa
          </label>
        </fieldset>
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
