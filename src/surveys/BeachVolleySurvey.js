// src/surveys/BeachVolleySurvey.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/Survey.css';

const BeachVolleySurvey = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
    zona: '',
    struttura: '',
    abilita: '',
    composizione: '',
    giorni: '',
    orario: '',
    carpooling: '',
    torneo: ''
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
      const collectionRef = collection(db, 'BeachVolleySurvey');
      await addDoc(collectionRef, formData);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey: ', error);
      alert('Error submitting survey. Please try again.');
    }
  };

  return (
    <div className="survey-container">
      <h1>Beach Volley Survey</h1>
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
        <input type="text" name="zona" placeholder="Zona" onChange={handleChange} required />
        <input type="text" name="squadra / struttura" placeholder="Se giochi indica squadra e struttura" onChange={handleChange} required />
        <select name="abilita" onChange={handleChange} required>
          <option value="">Seleziona Livello</option>
          <option value="Principiante">Principiante: è alle prime armi del beach volley: preferisce giocare in una squadra di almeno 3 o 4 persone. Applica le regole della pallavolo</option>
          <option value="Medio">Medio: Conosce bene tutti i fondamentali, sviluppa l'azione offensiva sfruttando tutti i tocchi a disposizione. Applica alcune regole del beachvolley (es. no pallonetti) e ne trascura altre (es. ricezione in palleggio). ogni partita si definiscono le regole da applicare</option>
          <option value="Avanzato">Avanzato: il giocatore avanzato sa attaccare forte e sa come difendere da attacchi forti. gioca solo 2 vs 2 e applica tutte le regole del beachvolley</option>
        </select>
        <fieldset>
          <legend>Generalmente con quante persone in campo sei abituato/a a giocare?</legend>
          <label>
            <input type="checkbox" name="composizione" value="2vs2" onChange={handleChange} /> 2vs2
          </label>
          <label>
            <input type="checkbox" name="composizione" value="3vs3" onChange={handleChange} /> 3vs3
          </label>
          <label>
            <input type="checkbox" name="composizione" value="4vs4" onChange={handleChange} /> 4vs4
          </label>
          <label>
            <input type="checkbox" name="composizione" value="5vs5 o di più" onChange={handleChange} /> 5vs5 o di più
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
            <input type="checkbox" name="orario" value="alle 18" onChange={handleChange} /> alle 18
          </label>
          <label>
            <input type="checkbox" name="orario" value="alle 19" onChange={handleChange} /> alle 19
          </label>
          <label>
            <input type="checkbox" name="orario" value="alle 20" onChange={handleChange} /> alle 20
          </label>
          <label>
            <input type="checkbox" name="orario" value="alle 21" onChange={handleChange} /> alle 21
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

export default BeachVolleySurvey;
