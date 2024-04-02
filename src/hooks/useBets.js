'use client'
import React, { createContext, useContext, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'


const BetsContext = createContext()

// Provider para armazenar as apostas
export const BetsProvider = ({ children }) => {

    // Declaração dos hooks necessarios
    const { toast } = useToast()

    // Variável de estado para armazenar as apostas
    const [bets, setBets] = useState([])

    // Função para buscar as apostas no banco de dados
    const fetchBets = async () => {
        setBets([])
        try {
            const headers = { 
                'Content-Type': 'application/json'
              }
            const resposta = await fetch('/api/get-info', { cache: 'no-store', headers });
            if (!resposta.ok) {
            throw new Error('Falha ao buscar dados');
            }
            const dados = await resposta.json();
            setBets(dados);
        } catch (error) {
            toast({ variant: 'destructive', title: error })
        }
    }

    // Função para limpar as apostas
    const clearBets = () => {
        setBets([])
    }

    return <BetsContext.Provider value={{ bets, fetchBets, clearBets }}>{children}</BetsContext.Provider>
    }

export const useBets = () => {
    const context = useContext(BetsContext)
    if (!context) {
        throw new Error('Tem q englobar o componente pai com BetsProvider')
    }
    return context
}
