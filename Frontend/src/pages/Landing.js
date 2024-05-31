import React from 'react';
import landingImage from '../images/lib.jpg'; // Assurez-vous d'avoir une image à ce chemin
import user1Image from '../images/1.jpeg'; // Assurez-vous d'avoir une image à ce chemin
import user2Image from '../images/2.png'; // Assurez-vous d'avoir une image à ce chemin

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Alignement central vertical
  height: '100vh', // Hauteur de la page entière
  backgroundImage: `url(${landingImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: 'white', // Couleur du texte en blanc
  padding: '20px', // Réduit l'espace pour le texte
};

const titleStyle = {
  textAlign: 'center',
  margin: '0', // Supprime les marges par défaut du titre
};

const textStyle = {
  textAlign: 'center',
  fontSize: '1rem', // Taille de police plus grande
  margin: '20px 0', // Ajoute de l'espace autour du texte
};

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fond transparent
  padding: '20px',
  margin: '20px',
  width: '70vw', // Largeur de la fenêtre du navigateur
  height: '30vh', // Hauteur de la fenêtre du navigateur
};

const userStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%', // Crée une forme de cercle
  marginBottom: '10px',
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
      <form style={formStyle}>
        <h2>About Us</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={userStyle}>
            <img src={user1Image} alt="User 1" style={imageStyle} />
            <p>Imane JALAL</p>
            <p>Big Data Analytics</p>
          </div>
          <div style={userStyle}>
            <img src={user2Image} alt="User 2" style={imageStyle} />
            <p>Soufiane BENLAHCEN</p>
            <p>Big Data Analytics</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Landing;
