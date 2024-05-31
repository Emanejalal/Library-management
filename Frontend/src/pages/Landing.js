import React from 'react';
import landingImage from '../images/lib.jpg'; // Ensure you have an image at this path
import '../App.css'; // Ensure this path is correct

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${landingImage})` }}
      ></div>
      <div className="relative text-center "> {/* Adjusted margin-top */}
        <h1 className="text-9xl">Welcome to Libratech</h1>
      </div>
      <h2 className="relative text-3xl mt-4">Empowering Libraries, Enriching Mind</h2> {/* Adjusted margin-top */}
      <div className="relative text-center text-lg mt-5">
        {/* Additional text goes here */}
      </div>
    </div>
  );
}

export default Landing;
