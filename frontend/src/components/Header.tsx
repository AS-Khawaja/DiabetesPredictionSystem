
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
        Diabetes Risk Prediction
      </h1>
      <p className="mt-2 text-db-200">
        Enter your health metrics below for a diabetes risk assessment
      </p>
    </header>
  );
};

export default Header;
