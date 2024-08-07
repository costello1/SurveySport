// src/surveys/CalcettoSurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';

const CalcettoSurvey = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    zona: '',
    squadra: '',
    abilita: '',
    composizione: '',
    giorni: '',
    orario: '',
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
      const collectionRef = collection(db, 'CalcettoSurvey');
      await addDoc(collectionRef, formData);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('Error submitting survey. Please try again.');
    }
  };

  return (
    <div className="survey-container">
      <h1>Calcetto Survey</h1>
      <form onSubmit={handleSubmit} className="survey-form">
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="text" name="cognome" placeholder="Cognome" onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Telefono (aziendale o privato)" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (aziendale o privata)" onChange={handleChange} required />
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
        <input type="text" name="squadra dove gioca" placeholder="Se già giochi a calcetto con qualche squadra puoi indicarci in quale struttura e dove si trova? " onChange={handleChange} required />
        <select name="abilita" onChange={handleChange} required>
          <option value="">Seleziona Livello</option>
          <option value="Principiante">Principiante</option>
          <option value="Medio">Medio</option>
          <option value="Avanzato">Avanzato</option>
        </select>
        <fieldset>
          <legend>Hai preferenze riguardo alla composizione delle squadre?</legend>
          <label>
            <input type="checkbox" name="composizione squadra" value="maschile" onChange={handleChange} /> maschile
          </label>
          <label>
            <input type="checkbox" name="composizione squadra" value="femminile" onChange={handleChange} /> femminile
          </label>
          <label>
            <input type="checkbox" name="composizione squadra" value="miste" onChange={handleChange} /> miste
          </label>
          <label>
            <input type="checkbox" name="composizione squadra" value="nessuna preferenza" onChange={handleChange} /> nessuna preferenza
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
            <input type="checkbox" name="orario" value="immediatamente dopo la fine della giornata lavorativa" onChange={handleChange} /> immediatamente dopo la fine della giornata lavorativa
          </label>
          <label>
            <input type="checkbox" name="orario" value="in fascia serale" onChange={handleChange} /> in fascia serale
          </label>
          <label>
            <input type="checkbox" name="orario" value="entrambe le precedenti" onChange={handleChange} /> entrambe le precedenti
          </label>
        </fieldset>
        <select name="carpooling" onChange={handleChange} required>
          <option value="">Se sei automunito/a, saresti disposto a organizzare un carpooling per andare a giocare?</option>
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

export default CalcettoSurvey;
