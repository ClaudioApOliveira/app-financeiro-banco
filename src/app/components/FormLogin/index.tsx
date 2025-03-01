import { UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import LinkNext from "../Link";

type Login = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const { handleSubmit, register } = useForm<Login>();

  const loginAttempt = async (data: Login) => {
    signIn("credentials", {
      callbackUrl: "/",
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(loginAttempt)}
      className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
    >
      <p className="text-white font-medium text-center text-lg">LOGIN</p>
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
      </div>
      <div className="mt-2">
        <label className="block text-sm text-white">Senha</label>
        <input
          {...register("password", { required: true })}
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          type="password"
          id="password"
          placeholder="Digite a sua senha"
          arial-label="password"
          required
        />
      </div>

      <div className="mt-4 items-center justify-center flex">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
          type="submit"
        >
          Entrar
        </button>
      </div>
      <div className="text-center ">
        <LinkNext href="/cadastro" text="Criar uma conta" icon={<UserPlus />} />
      </div>
    </form>
  );
}
