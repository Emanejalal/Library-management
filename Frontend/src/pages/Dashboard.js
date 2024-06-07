import React,{useState , useEffect} from 'react';
import '../style.css';
import { jwtDecode } from 'jwt-decode'; // Correct named impor

import CardBox from '../components/Dashboard/CardBox';
import BookList from '../components/Dashboard/Details';
import Loaans from '../components/Dashboard/loaans';




function App() {
  const [firstName, setFirstName] = useState('User');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            setFirstName(decodedToken.firstName);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }
}, []);
  return (
    <div className="container">
      <div className="main">
        <h1 className='mx-10 my-10 text-7xl font-serif text-slate-700'>Hello {firstName} </h1>
        <CardBox />
        <BookList />
        <Loaans/>
      </div>
    </div>
  );
}

export default App;
