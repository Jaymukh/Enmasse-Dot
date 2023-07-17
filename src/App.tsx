import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/headerPanel/Header';
import { useState } from 'react';

function App() {
  const [mapDisplay, setMapDisplay] = useState(true);
  const handleMapDisplay = (flag: boolean | ((prevState: boolean) => boolean)) => {
    setMapDisplay(flag);
}
  return (
    <div className="App">
        <Header  />
   
    </div>
  );
}

export default App;
