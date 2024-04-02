import { ScrollArea } from "../ui/scroll-area"
import { Card, CardTitle } from "../ui/card"
import { CurrentBets } from "../CurrentBets/currentBets"


export const Bets = () => {    
    return (
      //Container de apostas atuais
      <div className="py-8 pr-12 max-h-[90vh] h-[90vh]">
      <Card className='flex flex-col float-right w-[400px] max-w-[400px] h-full border-none bg-primary rounded-[32px]'>
        <CardTitle className='py-10 text-3xl text-center text-white font-roboto-condensed font-light'>
          Apostas Atuais
        </CardTitle>
        <div className="flex flex-grow justify-center items-center pb-10">
            <CurrentBets />
        </div>

      </Card>
      </div>
    )
  }
  