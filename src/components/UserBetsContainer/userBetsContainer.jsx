import { Card, CardTitle } from "../ui/card"
import { useState, useEffect } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area"
import NumbersBox from "../NumberBox/numberBox";

// Componente para exibir as apostas do usuário
export const UserBetsContainer = ({userBets}) => {

    return (
      <div className="w-full h-full">
        <Card className='w-full h-full max-h-[calc(100vh-4rem)] overflow-hidden border-none bg-white rounded-[16px]'>     
            <CardTitle className='py-10 px-12 text-3xl text-left text-primary font-roboto-condensed font-light'> 
                Suas Apostas: 
            </CardTitle>

            <ScrollArea className="max-h-[calc(100vh-30rem)] overflow-auto">
              <div className="px-10 font-roboto-condensed font-normal text-primary grid gap-1">
                {userBets.length > 0 ?
                  userBets.map((item, index) => (
                      <div 
                        key={index}
                        name={item.name}
                        id={item._id}
                      > 
                          <div className="flex justify-between text-xl text-black font-medium">
                              Registro: {item.register}
                          </div>
                          <div className="flex pt-2">
                              <NumbersBox numbers={item.numbers} />
                          </div>
                      </div>
                  ))
                  :
                  <div className="text-center text-black text-lg font-medium">Nenhuma aposta realizada</div>
                }
              </div>
            </ScrollArea>
        </Card>
      </div>
    )
  }
   