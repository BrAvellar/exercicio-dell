import { Card, CardTitle } from "../ui/card"
import { ChooseNumber } from "../ChooseNumber/chooseNumber"
import CountdownTimer from "../CountdownTimer/countDownTimer";
import { useState, useEffect } from "react";
import { RaffleContainer } from "../RaffleContainer/raffleContainer";
import { UserBetsContainer } from "../UserBetsContainer/userBetsContainer";
import { GameInformationContainer } from "../GameInformationContainer/gameInformationContainer";
import { useBets } from "@/hooks/useBets";
import { useRaffle } from "@/hooks/useRaffle";
import { useUserBets } from "@/hooks/useUserBets";
import { useUserFunds } from "@/hooks/useUserFunds";
import { useToast } from "../ui/use-toast";


// Componente container PRINCIPAL 
// Recebe os componentes de aposta, sorteio, informações do jogo e informações do usuário
export const NumbersContainer = () => { 
  
  // Declaração dos hooks necessarios
  const {winningNumbers, handleRaffleNumbers, handleRaffleExtraNumbers} = useRaffle()
  const {bets, clearBets} = useBets()
  const {userBets, fetchUserBets} = useUserBets();
  const { clearWinNum, clearTables } = useRaffle();
  const { raffleWinner } = useUserFunds();
  const { toast } = useToast();

  // Variáveis de estado para armazenar os ganhadores
  const [winners, setWinners] = useState([]);

  // Variável de estado para controlar o timer
  const [timer, setTimer] = useState(true);

  // Variável de estado para controlar a verificação de ganhadores
  const [check, setChecked] = useState(false);

  // Variável de estado para verificar se o usuário ganhou
  const [userWon, setUserWon] = useState([]);

  // Função para verificar se o usuário ganhou
  const findMatchingRegister = (winners, userBets) => {
    const matches = [];
  
    userBets.forEach(userBet => {
      const match = winners.find(winner => winner.register === userBet.register);
      if (match) {
        console.log(match);
        matches.push(match);
      }
    });
  
    return matches;
  };

  // Função para encontrar o ganhador
  const findWinner = ({bets, winningNumbers}) => {
      let winners = [];
        bets.forEach((bet) => {
            if(bet.register >= 1000){
                let hits = 0;            
                let numbersArray = JSON.parse(bet.numbers); 
                numbersArray.forEach(betNumber => {
                    if(winningNumbers.includes(betNumber)){
                        hits++;
                    }
                });
                if(hits === 5){
                    console.log("Ganhou");
                    winners.push(bet);
                }
            }
        });
      
      setChecked(true);
      return winners;
}

  // Função fim do timer de apostas
  const handleComplete = () => {

    // Inicializa o timer para fase de sorteio
    setTimer(false);

    // Chama função para sortear numeros
    if(winningNumbers.length === 0){
      handleRaffleNumbers();
    } 
    // Verifica se existem apostas
    fetchUserBets();
  };

  // Função para iniciar o sorteio
  const handleStart = () => {
    
    // Limpa os estados
    setUserWon([]);
    setWinners([]);
    clearTables();
    clearBets();
    clearWinNum();

    // Inicializa o timer para fase de apostas
    setTimer(true);
  };


  useEffect(() => {
    // Valida os estados das variáveis para verificar os ganhadores
    if(winningNumbers.length < 30 && winners.length == 0 && !timer && !check && bets.length>0){
      setWinners(findWinner({bets, winningNumbers}));
    }

    // Valida os estados das variáveis para sortear os números extras
    if(winners.length == 0 && check && winningNumbers.length < 30 && !timer){
        handleRaffleExtraNumbers();
        setChecked(false);
      }
    
  },[timer, bets, check, winningNumbers, winners])

  useEffect(() => {
    // Valida os estados das variáveis para verificar se o usuário ganhou
    if(winners.length > 0 && userBets.length > 0 && userWon.length == 0){
      setUserWon(findMatchingRegister(winners, userBets));
    }
    // Valida os estados das variáveis para chamar a função de adicionar o prêmio
    if(userWon.length > 0){
      raffleWinner()
      toast({
        title: "Você Ganhou!!",
        description: "Foi adicionado o prêmio de R$1500,00 no seu saldo.",
        variant: 'success',
      });
    }   
  },[winners, userBets, userWon])

  return (
    <div className="py-8 px-12 w-full max-h-[90vh] h-[90vh]">
      <Card className='flex flex-col w-full h-full border-none bg-primary rounded-[32px]'>
          
          {/* Caso necessário modificar o tempo de cada etapa, alterar o valor de duration dentro do componente CountdownTimer*/}
          
          {/* Fase de aposta */}
          {timer && 
            <>
              <CardTitle className='flex py-10 text-3xl justify-center text-white font-roboto-condensed font-light gap-2'> 
                Fase de aposta: <CountdownTimer duration={60} onComplete={handleComplete} />
              </CardTitle>
              <div className="flex flex-grow justify-center items-center mb-10">
                <ChooseNumber />
              </div>
            </>
          }
          {/* Fase de sorteio */}
          {!timer && 
            <>
              <CardTitle className='flex py-10 text-3xl justify-center text-white font-roboto-condensed font-light gap-2'> 
                Próximo sorteio:  <CountdownTimer duration={20} onComplete={handleStart} />
              </CardTitle>
              <div className="flex flex-grow justify-center items-center pb-10 px-12 gap-4 ">
                <UserBetsContainer userBets={userBets}/>
                <RaffleContainer winningNumbers={winningNumbers}/>
                <GameInformationContainer winners={winners} bets={bets}/>
              </div>
            </>
          }
      </Card>
    </div>
  )
}
  