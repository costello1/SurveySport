// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveySelection from './components/SurveySelection';
import RunningSurvey from './surveys/RunningSurvey';
import TrekkingSurvey from './surveys/TrekkingSurvey';
import CalcettoSurvey from './surveys/CalcettoSurvey';
import PadelSurvey from './surveys/PadelSurvey';
import BeachVolleySurvey from './surveys/BeachVolleySurvey';
import Admin from './components/Admin';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<SurveySelection />} />
        <Route path="/survey/running" element={<RunningSurvey />} />
        <Route path="/survey/trekking" element={<TrekkingSurvey />} />
        <Route path="/survey/calcetto" element={<CalcettoSurvey />} />
        <Route path="/survey/padel" element={<PadelSurvey />} />
        <Route path="/survey/beachvolley" element={<BeachVolleySurvey />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
