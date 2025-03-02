"use client";

import { useState } from "react";
import styles from "./home.module.css";
import ConsultaSaldo from "../components/ConsultaSaldo";
import { useSession } from "next-auth/react";
import LinkNext from "../components/Link";
import { LogOut } from "lucide-react";
import DepositoForm from "../components/Deposito";
import TransferenciaForm from "../components/Transferencia";
import ExtratoConta from "../components/Extrato";

type ButtonHomeProps = {
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
};

function ButtonHome({ text, onClick, className }: ButtonHomeProps) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  text: string;
};

function Modal({ isOpen, onClose, children, text }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-200 p-2 rounded-lg min-w-96 w-1/2 max-h-[50vh] max-w-32 overflow-y-auto">
        <h2 className="flex text-xl mb-4 justify-center items-center">
          {text}
        </h2>
        {children}

        <div className="flex justify-end items-center sticky bottom-4">
          <button
            className="opacity-20 hover:opacity-100 px-3 py-1 bg-red-500 text-white rounded-lg"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [textModel, setTextModel] = useState<string>("");

  const openModal = (content: React.ReactNode, text: string) => {
    setModalContent(content);
    setIsModalOpen(true);
    setTextModel(text);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className={styles.container}>
      <span className="font-serif text-xl">Usuário: {session?.user.email}</span>
      <div className="flex flex-col gap-4 mb-6 w-screen h-screen justify-center items-center">
        <div className="grid grid-cols-2 gap-10">
          <ButtonHome
            className="mt-4 px-4 py-2 border border-gray-400 rounded-lg hover:shadow-[10px_5px_10px_rgba(0,0,0,0.3)] hover:shadow-gray-950 hover:bg-gray-400 hover:transform hover:text-black hover:-translate-x-4 hover:-translate-y-4 transition duration-200 ease-in-out focus:outline-none"
            text="Transferência"
            onClick={() =>
              openModal(
                <TransferenciaForm onClose={closeModal} />,
                "Transferência"
              )
            }
          />
          <ButtonHome
            className="mt-4 px-4 py-2 border border-gray-400 rounded-lg hover:shadow-[-10px_5px_10px_rgba(0,0,0,0.3)] hover:shadow-gray-950 hover:bg-gray-400 hover:transform hover:text-black hover:translate-x-4 hover:-translate-y-4 transition duration-200 ease-in-out focus:outline-none"
            text="Consulta de Saldo"
            onClick={() => openModal(<ConsultaSaldo />, "Saldo")}
          />
          <ButtonHome
            className="mt-4 px-4 py-2 border border-gray-400 rounded-lg hover:shadow-[10px_-5px_10px_rgba(0,0,0,0.3)] hover:shadow-gray-950 hover:bg-gray-400 hover:transform hover:text-black hover:-translate-x-4 hover:translate-y-4 transition duration-200 ease-in-out focus:outline-none"
            text="Deposito"
            onClick={() =>
              openModal(<DepositoForm onClose={closeModal} />, "Depósito")
            }
          />
          <ButtonHome
            className="mt-4 px-4 py-2 border border-gray-400 rounded-lg hover:shadow-[-10px_-5px_10px_rgba(0,0,0,0.3)] hover:shadow-gray-950 hover:bg-gray-400 hover:transform hover:text-black hover:translate-x-4 hover:translate-y-4 transition duration-200 ease-in-out focus:outline-none"
            text="Extrato"
            onClick={() => openModal(<ExtratoConta />, "Extrato da Conta")}
          />
        </div>
        {session && (
          <LinkNext
            href="/api/auth/signout"
            text="Logout"
            icon={<LogOut size={20} />}
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} text={textModel}>
        {modalContent}
      </Modal>
    </main>
  );
}
