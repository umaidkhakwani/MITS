import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
  return(  <div>
  <h1>home page</h1>
  <nav>
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
  </div>
  );
}

export default Home;