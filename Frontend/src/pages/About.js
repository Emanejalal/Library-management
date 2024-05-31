import React from 'react';
import landingImage from '../images/lib.jpg'; // Assurez-vous d'avoir une image à ce chemin
import user1Image from '../images/1.jpeg'; // Assurez-vous d'avoir une image à ce chemin
import user2Image from '../images/2.png'; // Assurez-vous d'avoir une image à ce chemin

function About() {
  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white p-5" 
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <form className="bg-white bg-opacity-50 p-8 m-5 w-3/5 h-3/5 rounded-lg backdrop-blur-md transition transform duration-300 hover:scale-105 hover:bg-opacity-60">
        <h2 className="text-center mb-8 text-4xl font-bold">About Us</h2>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <img src={user1Image} alt="User 1" className="w-48 h-48 rounded-full mb-4" />
            <p className="text-2xl font-semibold">Imane JALAL</p>
            <p className="text-xl">Big Data Analytics</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={user2Image} alt="User 2" className="w-48 h-48 rounded-full mb-4" />
            <p className="text-2xl font-semibold">Soufiane BENLAHCEN</p>
            <p className="text-xl">Big Data Analytics</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default About;
