import React, { useState } from 'react';
import { Card, CardTitle, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { ConfirmNumbersModal } from '../ConfirmNumbersModal/confirmNumbersModal';
import { ScrollArea } from '../ui/scroll-area';

// Componente de escolha de números
export const ChooseNumber = () => {

    // Declaração dos hooks necessarios
    const { toast } = useToast();

    // Variável de estado para armazenar os números selecionados
    const [selectedValues, setSelectedValues] = useState([]);

    // Variável de estado para controlar a abertura da dialog
    const [open, setOpen] = useState(false);

    // Funçao para abrir dialog
    const handleOpenDialog = () => {
        if (selectedValues.length < 5) {
          // Exibe um toast de erro se menos de 5 números foram selecionados
          toast({
            title: "Aviso",
            description: "Você precisa selecionar 5 números antes de confirmar.",
            status: "error", 
            variant: 'destructive',
          });
        } else {
          // Abre a dialog se 5 ou mais números foram selecionados
            setOpen(true);
        }
      };

    // Função para limpar os números selecionados
    const handleClearButton = () => {
        setSelectedValues([]);
    }

    // Função para sortear números aleatórios
    const handleSurprise = () => {
        setSelectedValues(prev => {
            // Calcula quantos números ainda precisam ser sorteados para chegar a 5
            const numbersNeeded = 5 - prev.length;
            
            let newNumbers = [...prev]; // Começa com os números já selecionados
    
            while (newNumbers.length < 5) {
                const random = Math.floor(Math.random() * 50) + 1;
                
                // Adiciona o número aleatório se ele ainda não estiver na lista
                if (!newNumbers.includes(random)) {
                    newNumbers.push(random);
                }
    
                // Se já temos 5 números, para o loop
                if (newNumbers.length === 5) break;
            }
    
            // Retorna a nova lista de números, garantindo que esteja ordenada
            return newNumbers.sort((a, b) => a - b);
        });
    }
    
    // Função para criar os botões de seleção de números
    const ToggleButtons = () => {

        const handleToggle = (value) => {
            setSelectedValues(prev => {
                if (prev.includes(value)) {
                  // Se já está selecionado, deseleciona
                  return prev.filter(v => v !== value);
                } else if (prev.length >= 5) {
                  // Se tentar selecionar mais de 5, mostra o toast
                  toast({
                    title: "Aviso",
                    description: "Não é possível selecionar mais de 5 valores.",
                    status: "error",
                    variant: 'destructive',
                  });
                  return prev; // Mantém o estado atual, não adiciona o novo valor
                } else {
                  // Adiciona o novo valor e mantém ordenado
                  return [...prev, value].sort((a, b) => a - b);
                }
              });
        };

        return (
            <div>
              {/* Loop para criação dos botões de seleção Array de tamanho 50 */}
              {Array.from({ length: 50 }, (_, i) => i + 1).map(number => (
                <Button                  
                  key={number}
                  variant={selectedValues.includes(number) ? 'solid' : 'outline'}
                  onClick={() => handleToggle(number)}
                  className={`m-1 p-2 text-xs w-[7rem] h-[3rem] ${selectedValues.includes(number) ? "bg-primary text-white" : "bg-white text-primary"}`}                
                >
                  {number}
                </Button>
              ))}
            </div>
          );
    };

    return (
      <div className="px-12 w-full h-full">
        <Card className='w-full h-full border-none bg-white rounded-[16px] max-h-[calc(100vh-19rem)] overflow-hidden'>
            <CardTitle className='pt-8 text-3xl text-center text-primary font-roboto-condensed font-light'>
                Escolha seus números!
            </CardTitle>

            <ScrollArea className="max-h-[calc(100vh-20rem)] overflow-auto">
              <div className="flex justify-center items-center py-10 flex-grow pb-8">
                  <div className='mx-4 pl-5'>
                    <ToggleButtons />
                  </div>
              </div>
              <CardFooter>
                  <div className='pl-20'>
                      <Button type='submit' size="lg" variant="confirm" onClick={handleOpenDialog}>Confirmar</Button>
                      <ConfirmNumbersModal open={open} setOpen={setOpen} selectedValues={selectedValues} setSelectedValues={setSelectedValues} />
                  </div>
                  <div className="flex flex-grow justify-end py-16 pr-20 gap-4">
                      <Button type='submit' size="lg" onClick={handleSurprise} variant="default" >Surpresinha</Button>
                      <Button type='Cancel' size="lg" onClick={handleClearButton} variant="destructive" className="rounded-md border bg-white p-2 text-black">
                          Limpar escolhas
                      </Button> 
                  </div>
              </CardFooter>
            </ScrollArea>
        </Card>
      </div>
    )
  }
   