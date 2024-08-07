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
        <input type="text" name="telefono" placeholder="Telefono (aziendale o privato)" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (aziendale o privata)" onChange={handleChange} required />
        <fieldset>
          <legend>Seleziona Zona</legend>
          <label>
            <input type="checkbox" name="zona" value="Verbania" onChange={handleChange} /> zona di Verbania
          </label>
          <label>
            <input type="checkbox" name="zona" value="Lecco" onChange={handleChange} /> zona di Lecco
          </label>
          <label>
            <input type="checkbox" name="zona" value="Varese" onChange={handleChange} /> sopra Varese e lago di Lugano
          </label>
          <label>
            <input type="checkbox" name="zona" value="Valtellina" onChange={handleChange} /> la Valtellina
          </label>
        </fieldset>
        <input type="text" name="esperienza" placeholder="Esperienza" onChange={handleChange} required />
        <select name="abilita" onChange={handleChange} required>
          <option value="">Seleziona Livello</option>
          <option value="Principiante">Principiante: nessuna o quasi nessuna esperienza di trekking in montagna, dislivello inferiore a 500m, durata massima 3h</option>
          <option value="Medio">Medio: qualche uscita alle spalle, dislivello inferiore a 1000m, durata massima 5 h</option>
          <option value="Avanzato">Avanzato: a suo agio sui sentieri di montagna con esperienza di dislivelli/durata superiori ai 1000m/5h giornaliere</option>
        </select>
        <input type="text" name="caratteristiche" placeholder="Indicaci le caratteristiche delle tue abituali camminate (lunghezza, dislivello, altro)" onChange={handleChange} required />
        <fieldset>
          <legend>In quali giorni preferiresti che venissero organizzate le escursioni?</legend>
          <label>
            <input type="checkbox" name="giorni" value="sabato" onChange={handleChange} /> sabato
          </label>
          <label>
            <input type="checkbox" name="giorni" value="domenica" onChange={handleChange} /> domenica
          </label>
        </fieldset>
        <fieldset>
          <legend>Durata delle escursioni?</legend>
          <label>
            <input type="checkbox" name="durata" value="mezza giornata" onChange={handleChange} /> mezza giornata
          </label>
          <label>
            <input type="checkbox" name="durata" value="giornata" onChange={handleChange} /> giornata
          </label>
          <label>
            <input type="checkbox" name="durata" value="intero weekend" onChange={handleChange} /> intero weekend
          </label>
        </fieldset>
        <select name="carpooling" onChange={handleChange} required>
          <option value="">Se sei automunito/a, saresti disposto a organizzare un carpooling per andare a fare trekking?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TrekkingSurvey;
