import React from 'react';

import { Link } from 'react-router-dom';

function About() {
  return (  <div>
  
  <h1>about page</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
    </div>
    );
}

export default About;