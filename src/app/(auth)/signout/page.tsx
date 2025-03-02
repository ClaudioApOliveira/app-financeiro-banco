"use client";

import FormOut from "@/app/components/FormOut";
import styles from "./signout.module.css";

export default function SignOut() {
  return (
    <main className={styles.container}>
      <div className="h-screen font-sans login bg-cover">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-dvw max-w-xl">
            <div className="leading-loose">
              <FormOut />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
