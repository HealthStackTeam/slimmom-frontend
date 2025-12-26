import React from 'react';
import CalculatorCalorieForm from '../components/CalculatorСalorieForm/CalculatorСalorieForm';
import RightSideBar from '../components/RightSideBar/RightSideBar';

const CalculatorPage = () => {
  return (
    <div>
      
      <div>
        <CalculatorCalorieForm />
      </div>

      <div>
        <RightSideBar />
      </div>
      
    </div>
  );
};

export default CalculatorPage;