// components/Pentagon.js

import React from 'react';

const Pentagon = ({ creativity, feasibility, management, impact, environmentalImpact }) => {
  // Calculate the coordinates of the pentagon points based on the provided values
  const calculateCoordinates = (angle, radius) => {
    const x = 150 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 150 - radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  // Calculate the coordinates for each point of the pentagon
  const creativityPoint = calculateCoordinates(0, (creativity / 100) * 100);
  const feasibilityPoint = calculateCoordinates((360 / 5) * 1, (feasibility / 100) * 100);
  const managementPoint = calculateCoordinates((360 / 5) * 2, (management / 100) * 100);
  const impactPoint = calculateCoordinates((360 / 5) * 3, (impact / 100) * 100);
  const environmentalImpactPoint = calculateCoordinates((360 / 5) * 4, (environmentalImpact / 100) * 100);

  // Combine the coordinates into a polygon
  const polygonPoints = `${creativityPoint.x},${creativityPoint.y} ${feasibilityPoint.x},${feasibilityPoint.y} ${managementPoint.x},${managementPoint.y} ${impactPoint.x},${impactPoint.y} ${environmentalImpactPoint.x},${environmentalImpactPoint.y}`;

  return (
    <div className="pentagon-container" style={{ fontSize: '16px', padding: '20px' }}>
      <svg height="100%" width="100%">
        <polygon points={polygonPoints} fill="#4caf50" />

        {/* Labels */}
        <text x={creativityPoint.x} y={creativityPoint.y - 5} textAnchor="middle" fill="#2196f3">
          Creativity
        </text>
        <text x={feasibilityPoint.x} y={feasibilityPoint.y + 15} textAnchor="middle" fill="#2196f3">
          Feasibility
        </text>
        <text x={managementPoint.x} y={managementPoint.y + 15} textAnchor="middle" fill="#2196f3">
          Management
        </text>
        <text x={impactPoint.x} y={impactPoint.y + 15} textAnchor="middle" fill="#2196f3">
          Impact
        </text>
        <text x={environmentalImpactPoint.x} y={environmentalImpactPoint.y + 15} textAnchor="middle" fill="#2196f3">
          Environmental Impact
        </text>
      </svg>
    </div>
  );
};

export default Pentagon;
