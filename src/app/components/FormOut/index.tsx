import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormOut() {
  const router = useRouter();
  const logoutAttempt = async () => {
    await signOut({
      callbackUrl: "/singin",
    });
  };

  return (
    <div className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl">
      <p className="text-white font-medium text-center text-lg">LOGOUT</p>

      <div className="grid grid-rows-1 gap-2 mt-4 items-center justify-center ">
        <button
          onClick={logoutAttempt}
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
        >
          Sair
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
