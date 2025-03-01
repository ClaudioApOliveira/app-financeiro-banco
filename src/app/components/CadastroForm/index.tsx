"use client";

import api from "@/services/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertError from "../AlertError";
import { useRouter } from "next/navigation";

type FormCadastro = {
  nome: string;
  dataNascimento: string;
  email: string;
  password: string;
};

export default function CadastroForm() {
  const router = useRouter();
  const [erroMessage, setErroMessage] = useState<string[] | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormCadastro>();

  const loginAttempt = async (data: FormCadastro) => {
    await api()
      .post("/user/create", data)
      .then(() => router.push("/signin"))
      .catch((error) => {
        setErroMessage(
          error.response.data.messagens?.map(
            (mess: { message: string }) => mess.message
          )
        );
      });
  };

  return (
    <form
      onSubmit={handleSubmit(loginAttempt)}
      className="w-96 max-w-96 m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
    >
      {erroMessage && <AlertError texto={erroMessage} />}
      <p className="text-gray-900 font-medium text-center text-lg">CADASTRO</p>
      <div>
        <label className="block text-sm text-white">Nome</label>
        <input
          {...register("nome", { required: true })}
          className="w-full px-4 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="text"
          id="nome"
          placeholder="Digite seu nome"
          aria-label="nome"
          required
        />
        <span className="text-red-400 text-sm font-bold">
          {errors?.nome?.message}
        </span>
      </div>
      <div className="">
        <label className="block text-sm text-white">Data Nascimento</label>
        <input
          {...register("dataNascimento", { required: true })}
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="date"
          id="dataNascimetno"
          placeholder="dd/MM/yyyy"
          aria-label="dataNascimento"
          required
        />
        <span className="text-red-400 text-sm font-bold">
          {errors?.dataNascimento?.message}
        </span>
      </div>
      <div className="">
        <label className="block text-sm text-white">E-mail</label>
        <input
          {...register("email", { required: true })}
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="email"
          id="email"
          placeholder="Digite o e-mail"
          aria-label="email"
          required
        />
        <span className="text-red-400 text-sm font-bold">
          {errors?.email?.message}
        </span>
      </div>
      <div className="mt-2">
        <label className="block  text-sm text-white">Senha</label>
        <input
          {...register("password", { required: true })}
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="password"
          id="password"
          placeholder="Digite a sua senha"
          arial-label="password"
          required
        />
        <span className="text-red-400 text-sm font-bold">
          {errors?.password?.message}
        </span>
      </div>

      <div className="mt-4 items-center justify-center flex">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
          type="submit"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
