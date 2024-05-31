import React from 'react';

function Topbar() {
  return (
    <div className="topbar">
      
      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
      
    </div>
  );
}

export default Topbar;
