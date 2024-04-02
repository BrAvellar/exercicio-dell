'use client'
import React, { createContext, useContext, useState } from 'react'

const UserBetsContext = createContext()

// Provider para armazenar as apostas do usuário
export const UserBetsProvider = ({ children }) => {

    // Variável de estado para armazenar as apostas do usuário
    const [userBets, setUserBets] = useState([])

    // Função para buscar as apostas do usuário no banco de dados
    const fetchUserBets = async () => {
        setUserBets([])
        try {
            const headers = { 
                'Content-Type': 'application/json'
              }
            const resposta = await fetch('/api/get-user-bets', { cache: 'no-store', headers });
            if (!resposta.ok) {
            throw new Error('Falha ao buscar dados');
            }
            const dados = await resposta.json();
            setUserBets(dados);
        } catch (error) {
        }

        console.log(userBets);
    }

    return <UserBetsContext.Provider value={{ userBets, fetchUserBets }}>{children}</UserBetsContext.Provider>
    }

export const useUserBets = () => {
    const context = useContext(UserBetsContext)
    if (!context) {
        throw new Error('Tem q englobar o componente pai com UserBetsProvider')
    }
    return context
}
