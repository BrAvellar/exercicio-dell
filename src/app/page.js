'use client'
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav/nav';
import { Bets } from '@/components/Bets/bets';
import { NumbersContainer } from '@/components/NumbersContainer/numbersContainer';


export default function Home() {

  const [message, setMessage] = useState('');
  const [connect, setConnected] = useState(false);

  useEffect(() => {
    // Chama a API interna para configurar o banco de dados ao carregar a página
    if(!connect){
    fetch('/api/setup-db')
      .then(res => res.json())
      .then(data => setMessage(data.message));
      setConnected(true);
    }
  }, []);

  return (
    <main className='h-screen w-screen'>
        <Nav />
        <div className='flex justify-between'>
          <NumbersContainer />
          <Bets />

        </div>
        
    </main>
  );
}
