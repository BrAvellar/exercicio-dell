"use client";
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const RaffleContext = createContext();

// Provider para armazenar e sortear os números sorteados
export const RaffleProvider = ({ children }) => {

  // Variável de estado para armazenar os números sorteados
  const [winningNumbers, setWinningNumbers] = useState([]); // Aleatório
  // const [winningNumbers, setWinningNumbers] = useState([1,2,3,4,5]); // Vitória Forjada

  // Função para sortear os números sem repetição
  const handleRaffleNumbers = () => {
    setWinningNumbers((prev) => {
      let newNumbers = [...prev]; // Começa com os números já selecionados

      while (newNumbers.length < 5) {
        const random = Math.floor(Math.random() * 50) + 1;

        // Adiciona o número aleatório se ele ainda não estiver na lista
        if (!newNumbers.includes(random)) {
          newNumbers.push(random);
        }

        // Se já temos 5 números, para o loop
        if (newNumbers.length === 5) break;
      }

      // Retorna a nova lista de números, garantindo que esteja ordenada
      return newNumbers.sort((a, b) => a - b);
    });
  };

  // Função para sortear os números extras sem repetição
  const handleRaffleExtraNumbers = () => {
    if (winningNumbers.length < 30) {
      setWinningNumbers((prev) => {
        const numbersNeeded = 1;
        let newNumbers = [...prev];
        while (newNumbers.length < prev.length + numbersNeeded) {
          const random = Math.floor(Math.random() * 50) + 1;
          if (!newNumbers.includes(random)) {
            newNumbers.push(random);
          }
        }
        return newNumbers.sort((a, b) => a - b);
      });
    }
  };

  // Função para limpar os números sorteados
  const clearWinNum = () => {
    setWinningNumbers([]); // Aleatório
    // setWinningNumbers([1,2,3,4,5]) // Vitória Forjada
  };

  // Função para limpar as tabelas
  const clearTables = () => {
    let message = "";
    fetch("/api/clear-tables")
      .then((res) => res.json())
      .then((data) => (message = data.message));
  };

  return (
    <RaffleContext.Provider
      value={{
        winningNumbers,
        clearWinNum,
        clearTables,
        handleRaffleNumbers,
        handleRaffleExtraNumbers,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error("Tem q englobar o componente pai com RaffleProvider");
  }
  return context;
};
