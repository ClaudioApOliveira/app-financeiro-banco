import Link from "next/link";
import { JSX } from "react";

interface LinkNextProps {
  href: string;
  text?: string;
  icon: JSX.Element;
}

export default function LinkNext({ href, text, icon }: LinkNextProps) {
  return (
    <Link href={href}>
      <nav className="justify-center p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-400 hover:opacity-60 text-white">
        {icon}
        <span className="text-[15px] ml-4  text-gray-200 font-bold opacity-100">
          {text}
        </span>
      </nav>
    </Link>
  );
}
