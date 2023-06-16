import React, { useEffect, useState } from 'react';
import { Button } from "../components/common/button";
import { Select } from "../components/common/select";
import { Campeonato } from "../interfaces";
import { fetchWrapper } from "../lib/fetch-wrapper";

export const Cronograma = () => {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const getData = async (signal?: AbortSignal) => {
    const values = await fetchWrapper.get<Campeonato[]>(`/campeonato`, signal);
    setCampeonatos(values);
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="py-5 flex border-b">
        <div className="w-1/4">
          <Select
            label="Campeonato"
            options={campeonatos.map(c => ({ label: `${c.nombre} ${c.categoria.nombre}`, value: c.id }))}
            onChange={(v) => { }}
          />
        </div>
      </section>
      <section className="flex flex-col">
        <div className="bg-gray-100 rounded-md flex flex-col justify-center items-center py-10 gap-3">
          <p className="text-base font-medium text-gray-900">No existe un cronograma para este campeonato</p>
          <div>
            <Button type="button">
              Generar Cronograma
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
