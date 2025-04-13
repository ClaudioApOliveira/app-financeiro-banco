import { CircleX } from "lucide-react";

interface AlertSucessoProps {
  texto: string | null;
}

export default function AlertSucesso({ texto }: AlertSucessoProps) {
  const containerClass = "flex justify-start items-center";
  const iconContainerClass = "py-1 pr-2";
  const messageClass = "font-bold";

  return (
    <section>
      <div
        className="bg-green-100 border-t-4 border-green-400 rounded text-green-500 px-4 py-3 shadow-md mb-2"
        role="alert"
      >
        <div className={containerClass}>
          <div className={iconContainerClass}>
            <CircleX size={25} />
          </div>
          <div>
            <p className={messageClass}>{texto}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
