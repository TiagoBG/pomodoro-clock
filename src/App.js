import { useState } from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import './styles/app.css'

function App() {

  return (
    <div className="container">
      <h1>Pomodoro Clock</h1>
      <p>Work smart, make it happen</p>
      <PomodoroTimer/>
    </div>
  );
}

export default App;
