'use client'
import React, { createContext, useContext, useState } from 'react'

const UserFunds = createContext()

// Provider para armazenar e gerenciar os fundos do usuário
export const UserFundsProvider = ({ children }) => {

    // Variável de estado para armazenar os fundos do usuário
    const [userFunds, setUserFunds] = useState(3000)

    // Função para fazer aposta - custo 5$
    const buyNumbers = () => {
        setUserFunds(userFunds - 5) 
    }

    // Função para adicionar fundos ao usuário - ganhos 1500$
    const raffleWinner = () => {
        setUserFunds(userFunds + 1500)
    }

    return <UserFunds.Provider value={{userFunds, buyNumbers, raffleWinner }}>{children}</UserFunds.Provider>
  }

export const useUserFunds = () => {
    const context = useContext(UserFunds)
    if (!context) {
        throw new Error('Tem q englobar o componente pai com UserFundsProvider')
    }
    return context
}
