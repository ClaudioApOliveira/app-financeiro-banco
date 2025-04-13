"use client";

import { useFetch } from "@/app/hooks/useFetcher";
import { useSession } from "next-auth/react";

type SaldoConta = {
  numero: string;
  saldo: number;
};

export default function ConsultaSaldo() {
  const { data: session } = useSession();
  const {
    data: saldoConta,
    isLoading,
    isError,
  } = useFetch<SaldoConta>("/user/saldo", session?.user.token);

  const formattedSaldo = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(saldoConta?.saldo || 0);

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Falha ao carregar</div>;

  return (
    <div className="grid grid-cols-1 gap-3">
      <span className="text-sm block text-black">
        Numero da Conta: {saldoConta?.numero}
      </span>
      <span>Saldo da Conta: {formattedSaldo}</span>
    </div>
  );
}
