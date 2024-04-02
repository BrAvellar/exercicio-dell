import { Card, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"
import { useBets } from "@/hooks/useBets"
import { ScrollArea } from "@radix-ui/react-scroll-area";

// Componente de apostas atuais
export const CurrentBets = () => {    

  // Declaração dos hooks necessarios
  const {bets} = useBets();

  // Função para formatar os números
  const formatNumbers = (numbers) => {
    let string = '';
    if(numbers != undefined){
    const numbersArray = JSON.parse(numbers);
    string = numbersArray.join(' - ');
    }
    return string;
  }

    return (
      <div className="px-12 w-full h-full">
        <Card className='w-full h-full max-h-[calc(100vh-4rem)] overflow-hidden border-none bg-white rounded-[16px]'>            
            <ScrollArea className="max-h-[calc(100vh-26rem)] overflow-auto">
              <div className="py-12 px-10 font-roboto-condensed font-normal text-primary grid gap-1">
                {bets.map((item, index) => (
                  index!==0 &&
                    <div 
                      key={index}
                      name={item.name}
                      id={item._id}
                    > 
                      <div className="flex ext-black font-medium gap-1">
                        <div className="text-black">
                          {item.name}:  
                        </div>
                        <div>
                          {formatNumbers(item.numbers)}
                        </div>
                      </div>
                      
                    </div>
                  
                ))}
              </div>
            </ScrollArea>
        </Card>
      </div>
    )
  }
   