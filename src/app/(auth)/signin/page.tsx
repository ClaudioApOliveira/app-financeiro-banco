"use client";

import FormLogin from "@/components/FormLogin";
import styles from "./signin.module.css";

export default function SignIn() {
  return (
    <main className={styles.container}>
      <div className="h-screen font-sans login bg-cover">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
