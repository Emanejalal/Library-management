import React from 'react';
import '../style.css';
import Topbar from '../components/Dashboard/Topbar';
import CardBox from '../components/Dashboard/CardBox';
import BookList from '../components/Dashboard/Details';
import Loaans from '../components/Dashboard/loaans';

function App() {
  return (
    <div className="container">
      <div className="main">
        <Topbar />
        <CardBox />
        <BookList />
        <Loaans/>
      </div>
    </div>
  );
}

export default App;
