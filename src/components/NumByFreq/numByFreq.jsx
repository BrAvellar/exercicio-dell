import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"

// Componente para exibir os números apostados por frequência
export default function NumByFreq({bets}) {

    // Variável de estado para armazenar os números por frequência
    const [numByFreq, setNumByFreq] = useState([])

    // Variável de estado para controlar a busca
    const [search, setSearched] = useState(false)

    // Função para calcular a frequência dos números
    const handleNumberByFreq = (bets) => {
        const numberCounter = {};
  
        bets.forEach((bet, index) => {
          if(index != 0){            
              let numbersArray = JSON.parse(bet.numbers); 
              numbersArray.forEach(number => {
                numberCounter[number] = (numberCounter[number] || 0) + 1;
              });
          }
      });
  
        // Transforma o objeto de contagem em um array de [número, frequência]
        const result = Object.entries(numberCounter).map(([number, freq]) => ({
          number: parseInt(number),
          freq
        }));
      
        // Ordena os resultados pela frequência de forma descendente
        result.sort((a, b) => b.freq - a.freq);
      
        return result;
    };

    // Verifica se houveram apostas e se a busca já foi feita
    useEffect(() => {
    if(numByFreq.length === 0 && bets.length > 0 && !search){
            setNumByFreq(handleNumberByFreq(bets))
            setSearched(true)
        }
    },[numByFreq, bets]);

    return(
        <div className="pt-2 grid">
        {
            numByFreq.length > 0 
            ?
                <Table>
                    <TableHeader>
                        <TableRow className="flex">
                            <TableHead>Número</TableHead>
                            <TableHead >Frequência</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { numByFreq.map((item, index) => {
                            return(
                                <TableRow className="flex gap-10" key={index}> 
                                    <TableCell>{item.number < 10 ? "0" + item.number : item.number }</TableCell>
                                    <TableCell>{item.freq < 10 ? "0" + item.freq : item.freq }</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            :
            <div className="text-center text-black text-lg font-medium pb-10">Não houveram apostas</div>
        }
        </div>
    );
}

