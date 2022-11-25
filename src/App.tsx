import React from 'react';
import './styles/App.scss';
import AppContainer from "./components/AppContainer"

function App() {
  return (
    <div className="app">
      <header className="app-header">Stock price app</header>
      <AppContainer />
    </div>
    );
}

export default App;
