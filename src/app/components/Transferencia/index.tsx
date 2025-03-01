"use client";

import api from "@/services/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertError from "../AlertError";

type FormTransferencia = {
  valor: number;
  numero: string;
};

type ModelProps = {
  onClose: () => void;
};

export default function TransferenciaForm({ onClose }: ModelProps) {
  const { data: session } = useSession();
  const [erroMessage, setErroMessage] = useState<string[] | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormTransferencia>();

  const depositar = async (data: FormTransferencia) => {
    await api(session?.user.token)
      .post("/user/transferencia", data)
      .then(onClose)
      .catch((error) => {
        setErroMessage(error.response.data.detalhe);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(depositar)}
      className="grid w-auto min-w-52 m-6 p-6 bg-gray-600 bg-opacity-25 rounded shadow-xl"
    >
      {erroMessage && <AlertError texto={erroMessage} />}
      <div>
        <label className="flex justify-center items-center m-2 text-sm text-black">
          NUMERO DA CONTA DESTINATÁRIO
        </label>
        <input
          {...register("numero", { required: true })}
          className="w-full px-4 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="text"
          id="numero"
          placeholder="Digite a conta de destino"
          aria-label="numero"
          required
        />
        <span className="text-red-400 text-sm font-bold">
          {errors?.valor?.message}
        </span>
      </div>
      <div>
        <label className="flex justify-center items-center m-2 text-sm text-black">
          VALOR DA TRANSFERENCIA
        </label>
        <input
          {...register("valor", { required: true, valueAsNumber: true })}
          className="w-full px-4 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="number"
          id="valor"
          placeholder="Digite o valor da transfereancia"
          aria-label="valor"
          required
          step="any"
        />
        <span className="text-red-400 text-sm font-bold">
          {errors?.valor?.message}
        </span>
      </div>

      <div className="mt-4 items-center justify-center flex">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
          type="submit"
        >
          Transferir
        </button>
      </div>
    </form>
  );
}
