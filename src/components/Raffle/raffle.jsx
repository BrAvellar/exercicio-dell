import { useEffect } from "react";
import NumbersBox from "../NumberBox/numberBox";

// Componente para exibir os números sorteados
const Raffle = ({winningNumbers}) => {

    return(
        <div className="flex px-4 pb-10">
            <NumbersBox numbers={winningNumbers} />
        </div>
    )
}

export default Raffle;