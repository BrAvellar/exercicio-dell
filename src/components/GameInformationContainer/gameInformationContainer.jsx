import { ScrollArea } from "../ui/scroll-area"
import { Card, CardTitle } from "../ui/card"
import { useEffect } from "react"
import NumByFreq from "../NumByFreq/numByFreq"
import { useRaffle } from "@/hooks/useRaffle"

// Componente de informações do jogo
export const GameInformationContainer = ({winners, bets}) => { 
  
    // Declaração dos hooks necessarios
    const {winningNumbers} = useRaffle()

    // Variável para armazenar os ganhadores ordenados
    let winnersSorted = []

    // Função para ordenar os ganhadores
    const sortWinners = (winners) => {
      
      winnersSorted = winners.sort((a, b) => {
        const nameA = a.name.toLowerCase(); 
        const nameB = b.name.toLowerCase(); 
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0; 
      }); 
    }

    // Função para calcular a quantidade de rodadas
    const roundsRaffled = ( ) => {
        let rounds = winningNumbers.length - 4;
        return rounds;
    }
    

    // Chama a função para ordenar os ganhadores
    useEffect(() => {
      winners.length > 0 &&
      sortWinners(winners)

    },[winners]);

    return (
      <div className="w-full h-full">
        <Card className='w-full h-full max-h-[calc(100vh-4rem)] overflow-hidden border-none bg-white rounded-[16px]'>     

          <CardTitle className='py-10 px-12 text-3xl text-left text-primary font-roboto-condensed font-light'> 
            Informações do jogo: 
          </CardTitle>       

            <ScrollArea className="max-h-[calc(100vh-30rem)] overflow-auto">
              <div className="pb-10 px-10 font-roboto-condensed font-normal text-primary grid gap-1">
                  <div className="flex justify-between text-xl text-black font-medium">
                      Ganhadores: 
                  </div>
                  <div className="grid pt-2">
                      {winners.length > 0 ?
                      <>
                        <div className="font-medium"> Total de {winners.length} ganhadores</div>
                        {
                          winners.map((item, index) => (
                              <div 
                                key={index}
                                id={item.id}
                              > 
                                  <div className="flex font-medium gap-4">
                                      <div>Registro: {item.register}</div>
                                      <div>Participante: {item.name}</div>
                                  </div>
                              </div>
                            
                          ))
                        }
                      </>
                      :
                      <div className="text-center text-black text-lg font-medium">Não houveram ganhadores</div>
                    }
                  </div>
              </div>

              <div className="px-10 font-roboto-condensed font-normal text-primary grid gap-1">
                  <div className="flex justify-between text-xl text-black font-medium">
                      Números mais apostados: 
                  </div>
                  <NumByFreq bets={bets}/>
              </div>

              <div className="px-10 font-roboto-condensed font-normal text-primary grid gap-1">
                  <div className="flex justify-between text-xl text-black font-medium">
                      Quantidade de rodadas: 
                  </div>
                    {roundsRaffled()}
              </div>

            </ScrollArea>
        </Card>
      </div>
    )
  }
   