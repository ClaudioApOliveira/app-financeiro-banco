"use client";

import CadastroForm from "@/app/components/CadastroForm";
import styles from "./cadastro.module.css";

export default function Cadastro() {
  return (
    <main className={styles.container}>
      <div className="h-screen font-sans login bg-cover">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <CadastroForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
