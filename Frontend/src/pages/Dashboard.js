import React from 'react';
import '../style.css';
import Navigation from '../components/Dashboard/Navigation';
import Topbar from '../components/Dashboard/Topbar';
import CardBox from '../components/Dashboard/CardBox';
import Details from '../components/Dashboard/Details';

function App() {
  return (
    <div className="container">
      <Navigation />
      <div className="main">
        <Topbar />
        <CardBox />
        <Details />
      </div>
    </div>
  );
}

export default App;
