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
        <input type="text" name="telefono" placeholder="Telefono (aziendale se disponibile o privato)" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (aziendale se disponibile o privata)" onChange={handleChange} required />
        <fieldset>
          <legend>Zona geografica dove preferiresti praticare l’attività</legend>
          <label>
            <input type="checkbox" name="zona" value="dintorni di Cascina Costa / Gallarate" onChange={handleChange} /> dintorni di Cascina Costa / Gallarate
          </label>
          <label>
            <input type="checkbox" name="zona" value="altra località (indica un centro urbano es. Milano, Varese, Legnano, ecc) " onChange={handleChange} /> altra località (indica un centro urbano es. Milano, Varese, Legnano, ecc) 
          </label>
          <label>
            <input type="checkbox" name="zona" value="Altro" onChange={handleChange} /> Altro
          </label>
        </fieldset>
        <input type="text" name="squadra" placeholder="Se giochi indica squadra e struttura" onChange={handleChange} required />
        <select name="abilita" onChange={handleChange} required>
          <option value="">Seleziona Livello</option>
          <option value="Principiante">Principiante</option>
          <option value="Medio">Medio</option>
          <option value="Avanzato">Avanzato</option>
        </select>
        <select name="corso" onChange={handleChange} required>
          <option value="">Parteciperesti a un corso monosettimana?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <fieldset>
          <legend>Hai preferenze riguardo alla composizione delle squadre?</legend>
          <label>
            <input type="checkbox" name="composizione" value="maschile" onChange={handleChange} /> maschile
          </label>
          <label>
            <input type="checkbox" name="composizione" value="femminile" onChange={handleChange} /> femminile
          </label>
          <label>
            <input type="checkbox" name="composizione" value="miste" onChange={handleChange} /> miste
          </label>
          <label>
            <input type="checkbox" name="composizione" value="nessuna preferenza" onChange={handleChange} /> nessuna preferenza
          </label>
        </fieldset>
        <fieldset>
          <legend>In quali giorni preferiresti giocare?</legend>
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
          <label>
            <input type="checkbox" name="giorni" value="sabato" onChange={handleChange} /> sabato
          </label>
          <label>
            <input type="checkbox" name="giorni" value="domenica" onChange={handleChange} /> domenica
          </label>
        </fieldset>
        <fieldset>
          <legend>In quale fascia oraria?</legend>
          <label>
            <input type="checkbox" name="orario" value="17-19" onChange={handleChange} /> 17-19
          </label>
          <label>
            <input type="checkbox" name="orario" value="19-21" onChange={handleChange} /> 19-21
          </label>
          <label>
            <input type="checkbox" name="orario" value="21-23" onChange={handleChange} /> 21-23
          </label>
          <label>
            <input type="checkbox" name="orario" value="altro (orari nel weekend) " onChange={handleChange} /> altro (orari nel weekend) 
          </label>
        </fieldset>
        <fieldset>
          <legend>Quando giochi hai un ruolo di preferenza?</legend>
          <label>
            <input type="checkbox" name="ruolo" value="Destra" onChange={handleChange} /> Destra
          </label>
          <label>
            <input type="checkbox" name="ruolo" value="Sinistra" onChange={handleChange} /> Sinistra
          </label>
          <label>
            <input type="checkbox" name="ruolo" value="Indifferente" onChange={handleChange} /> Indifferente
          </label>
        </fieldset>
        <select name="carpooling" onChange={handleChange} required>
          <option value="">Se sei automunito/a, e disposto a organizzare un carpooling?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <select name="torneo" onChange={handleChange} required>
          <option value="">Parteciperesti a un torneo?</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default PadelSurvey;
