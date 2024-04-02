'use client'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "../ui/use-toast"
import { useBets } from "@/hooks/useBets"
import { useUserFunds } from "@/hooks/useUserFunds"

// Modal de confirmação de números
export function ConfirmNumbersModal({ open, setOpen, selectedValues, setSelectedValues }) {

    // Declaração dos hooks necessarios
    const { toast } = useToast();
    const {fetchBets} = useBets()
    const {buyNumbers} = useUserFunds();

    // Valor vazio para caso de cancelar
    const defaultFormValues = {
        name: '',
        cpf: '',
        numbers: '',
      }

    // Formulário com estados padrão
    const [formValues, setFormValues] = useState({
        name: defaultFormValues.name,
        cpf: defaultFormValues.cpf,
        numbers: defaultFormValues.numbers,
      });
    
    // Atualiza os valores do formulário quando os números são selecionados
    useEffect(() => {
      setFormValues((prevData) => ({
          ...prevData,
          numbers: selectedValues,
      }));
    }, [selectedValues]);


    // Função para enviar a aposta
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/new-bet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
          });
    
          if (response.ok) {
            setSelectedValues([]) // Limpa os números selecionados
            buyNumbers() // Atualiza o saldo do usuário
            fetchBets() // Atualiza as apostas
            toast({
                title: "",
                description: "Aposta realizada com sucesso!",
                variant: 'success',
              });
              handleClose(); // Fecha a dialog
          } else {
            const resultado = await response.json();
            toast({
                title: "Aviso",
                description: resultado.message,
                variant: 'destructive',
            });
          }
        } catch (error) {
            const resultado = await response.json();
            toast({
                title: "Aviso",
                description: resultado.message,
                variant: 'destructive',
            });
          console.error("Erro ao enviar o formulário: ", error);
        }
      };
    
    // Função para atualizar os valores do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para fechar a dialog
    const handleClose = () => {
        setOpen(false);
        setFormValues(defaultFormValues);
    };

    // Função para formatar os números selecionados
    const formatNumbers = () => {
        let string = selectedValues.join(' - ');
        return string;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button type='submit' size="lg" variant="confirm" >Confirmar</Button> */}
        {open === true}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quase lá!</DialogTitle>
          <DialogDescription>
            Para confirmar a aposta preencha os campos abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Seus números:
                </Label>
                <p id="name" value="" className="col-span-3">{formatNumbers()}</p>
                </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Nome
                </Label>
                <Input name="name" type="name" placeholder="Informe seu nome" onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Cpf
                </Label>
                <Input name="cpf" type="text" maxLength="11" placeholder="Informe seu cpf" onChange={handleChange} className="col-span-3" />
            </div>
        </div>
        <DialogFooter>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" onClick={handleSubmit}>Confirmar</Button> 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
