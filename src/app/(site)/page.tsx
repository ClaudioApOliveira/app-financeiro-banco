"use client";

import { useState } from "react";
import styles from "./home.module.css";

type ButtonHomeProps = {
  text: string;
  onClick: () => void;
};

function ButtonHome({ text, onClick }: ButtonHomeProps) {
  return (
    <button
      className="mt-4 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-400 hover:transform hover:text-black hover:translate-x-4 hover:translate-y-4 transition duration-200 ease-in-out focus:outline-none"
      onClick={onClick} // Passando o onClick aqui
    >
      {text}
    </button>
  );
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl mb-4">Você clicou no botão!</h2>
        <p className="mb-4">
          Este é um modal simples que aparece ao clicar no botão.
        </p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className={styles.container}>
      <div className="flex flex-col gap-4 mb-6 w-screen h-screen justify-center items-center">
        <div className="grid grid-cols-2 gap-10">
          <ButtonHome text="Transferência" onClick={openModal} />
          <ButtonHome text="Consulta de Saldo" onClick={openModal} />
          <ButtonHome text="Deposito" onClick={openModal} />
          <ButtonHome text="Extrair Saldo" onClick={openModal} />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
