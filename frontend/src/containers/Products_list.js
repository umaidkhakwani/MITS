import React from 'react';

function RowTitleDisplay({ title }) {
  return (
    <div>
      <h2>Clicked Row Title</h2>
      <p>Title: {title}</p>
    </div>
  );
}

export default RowTitleDisplay;