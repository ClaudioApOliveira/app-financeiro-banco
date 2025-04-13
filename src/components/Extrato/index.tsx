"use client";
import { useFetch } from "@/app/hooks/useFetcher";
// Remover espaço extra
import { useSession } from "next-auth/react";

type ExtratoConta = {
  id: number;
  data: Date;
  tipoTransacao: string;
  valor: number;
};

export default function ExtratoConta() {
  const { data: session } = useSession();
  const {
    data: movimentacoes,
    isLoading,
    isError,
  } = useFetch<Array<ExtratoConta>>("/user/extrato", session?.user.token);

  const formattedValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor || 0);
  };

  const formattedData = (data: Date | string) => {
    const date = new Date(data);
    return !isNaN(date.getTime())
      ? new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(date)
      : "Data inválida";
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Falha ao carregar</div>;

  return (
    <div className="grid grid-cols-1 gap-3">
      {movimentacoes?.map((extrato, index) => (
        <div key={index} className="border-b py-2">
          <span className="text-sm block text-black">
            Data: {formattedData(extrato.data).replace(",", " -")}
          </span>
          <span className="text-sm block text-black">
            Valor: {formattedValor(extrato.valor)}
          </span>
          <span className="text-sm block text-black">
            Tipo: {extrato.tipoTransacao}
          </span>
        </div>
      ))}
    </div>
  );
}
