import React from 'react';
import landingImage from '../images/lib.jpg'; // Assurez-vous d'avoir une image à ce chemin

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundImage: `url(${landingImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: 'white', // Couleur du texte en blanc
  padding: '200px',
};

const titleStyle = {
  textAlign: 'center',
};

const textStyle = {
  textAlign: 'center',
  maxWidth: '800px', // Limiter la largeur du texte

};

function Landing() {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        <h1>Welcome to Libratech</h1>
      </div>
      <div style={textStyle}>
        <p>At LibraTech, we understand the importance of efficient library management. Our comprehensive solution is designed to streamline the operations of libraries of all sizes, from small community libraries to large academic institutions.</p>
      </div>
    </div>
  );
}

export default Landing;
