import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const MainLayout = ({ title, children }: Props) => {
  const location = useLocation();

  return (
    <main className="grid grid-cols-12 h-screen">
      <section className="col-span-2 bg-gray-900">
        <h1 className="text-2xl font-semibold text-white text-center my-5">InterBarrios</h1>
        <div className="flex flex-col">
          <Link to="/home" className={clsx("p-4 font-medium text-base text-gray-300 hover:text-white hover:bg-blue-500", location.pathname.includes('home') && "bg-blue-500 text-white")}>
            Home
          </Link>
          <Link to="/campeonato" className={clsx("p-4 font-medium text-base text-gray-300 hover:text-white hover:bg-blue-500", location.pathname.includes('campeonato') && "bg-blue-500 text-white")}>
            Campeonatos
          </Link>
          <Link to="/cronograma" className={clsx("p-4 font-medium text-base text-gray-300 hover:text-white hover:bg-blue-500", location.pathname.includes('cronograma') && "bg-blue-500 text-white")}>
            Cronograma
          </Link>
          <Link to="/posiciones" className={clsx("p-4 font-medium text-base text-gray-300 hover:text-white hover:bg-blue-500", location.pathname.includes('posiciones') && "bg-blue-500 text-white")}>
            Posiciones
          </Link>
        </div>
      </section>
      <section className="col-span-10">
        <header className="border-b p-5">
          <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
        </header>
        <div className="p-5 h-[calc(100vh_-_5rem)] border-b">
          {children}
        </div>
      </section>
    </main>
  );
};
