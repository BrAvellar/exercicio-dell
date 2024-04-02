import Raffle from "../Raffle/raffle"
import { ScrollArea } from "../ui/scroll-area"
import { Card, CardTitle } from "../ui/card"

// Componente container para exibir os números sorteados
export const RaffleContainer = ({winningNumbers}) => {    

    return (
      <div className="w-full h-full">
        <Card className='w-full h-full border-none bg-white rounded-[16px]'>     

          <CardTitle className='py-10 px-12 text-3xl text-left text-primary font-roboto-condensed font-light'> 
            Números ganhadores: 
          </CardTitle>       

            <ScrollArea>
              <div className="flex px-10 font-roboto-condensed font-normal text-primary">
                <Raffle winningNumbers={winningNumbers} />
              </div>
            </ScrollArea>
        </Card>
      </div>
    )
  }
   