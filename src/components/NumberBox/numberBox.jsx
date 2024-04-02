import React from 'react';

// Componente para exibir números em caixas
const NumbersBox = ({ numbers }) => {

    // Converte os números em string para array
    let numbersArray;
    if(numbers !== undefined){
      if (!Array.isArray(numbers)) {
          numbersArray = JSON.parse(numbers); 
      } else{
          numbersArray = numbers;
      }
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', justifyContent: 'center', alignItems: 'center' }} className='gap-3'>
        {numbersArray !== undefined && numbersArray.map((number, index) => (
          <div key={index} style={{
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {number}
          </div>
        ))}
      </div>
  );
};

export default NumbersBox;
