"use client";

import api from "@/services/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertError from "../AlertError";

type FormDeposito = {
  valor: number;
};

type ModelProps = {
  onClose: () => void;
};

export default function DepositoForm({ onClose }: ModelProps) {
  const { data: session } = useSession();
  const [erroMessage, setErroMessage] = useState<string[] | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormDeposito>();

  const depositar = async (data: FormDeposito) => {
    await api(session?.user.token)
      .post("/user/deposito", parseFloat(data.valor.toString()))
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
        <label className="flex justify-center items-center mb-2 text-sm text-black">
          VALOR DO DEPOSITO
        </label>
        <input
          {...register("valor", { required: true, valueAsNumber: true })}
          className="w-full px-4 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="number"
          id="valor"
          placeholder="Digite o valor do deposito"
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
          Depositar
        </button>
      </div>
    </form>
  );
}
