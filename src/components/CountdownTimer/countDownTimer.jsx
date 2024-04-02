import React, { useEffect, useState } from 'react';

// Componente de contagem regressiva
const CountdownTimer = ({ duration, onComplete }) => {

  // Inicializar o estado do tempo restante
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // Sair cedo quando completar
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    // Salvar intervalId para limpar depois
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Limpar intervalo na desmontagem
    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  return (
    <div>
      {timeLeft}s
    </div>
  );
};

export default CountdownTimer;
