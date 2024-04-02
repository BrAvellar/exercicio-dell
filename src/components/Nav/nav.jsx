import { useUserFunds } from "@/hooks/useUserFunds";
import Image from "next/image";

// Componende header
const Nav = () => {

    // Declaração dos hooks necessarios
    const {userFunds} = useUserFunds();

    return (
        <div className="flex h-[6rem] w-full pb-22 border-b-2 border-customGray justify-between">
            <div className="flex p-2">
                <Image
                    src="images/Logo.png" 
                    alt="Logo da empresa"
                    width={130} 
                    height={90} 
                    unoptimized={true}
                />
            </div>
            <div className="flex h-full pt-1 pr-24 h-12 w-26 flex"> 
                <div className="flex pt-1 pl-8 h-fit w-fit">  
                    <div className="border rounded-xl m-4 px-5 py-3 text-primary font-roboto-condensed font-extrathin " >
                        {"Saldo: R$ " + 
                        userFunds + ",00"}
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default Nav;