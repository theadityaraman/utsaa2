// ResultPage.js
import React from 'react';

const ResultPage = ({ sortedDb }) => {
  return (
    <div>
      <h1>Top 3 Options</h1>
      {sortedDb && sortedDb.slice(0, 3).map((option, index) => (
        <div key={index} className="card">
          <h2>Option {index + 1}</h2>
          <p>Overall: {option.Overall.toFixed(2)}</p>
          {/* Add other statistics you want to display */}
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
