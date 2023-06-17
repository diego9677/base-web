import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/common/button";
import { Select } from "../components/common/select";
import { Spinner } from "../components/spinnner";
import { Campeonato, Cronograma } from "../interfaces";
import { fetchWrapper } from "../lib/fetch-wrapper";



export const Cronogramas = () => {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [selected, setSelected] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [tablaCronograma, setTablaCronograma] = useState<Cronograma[]>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campId = searchParams.get('campId');

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (selected) {
      fetchWrapper.get<Cronograma[]>(`/cronograma/campeonato/${selected}`)
        .then((values) => {
          console.log(values);
          setTablaCronograma(values);
        });
    }
  }, [selected]);

  useEffect(() => {
    if (campId && campeonatos.length > 0) {
      setSelected(Number(campId));
    }
  }, [campId, campeonatos]);

  const getData = async (signal?: AbortSignal) => {
    const values = await fetchWrapper.get<Campeonato[]>(`/campeonato`, signal);
    setCampeonatos(values);
  };

  const generateFixure = async () => {
    setLoading(true);
    const campeonato = campeonatos.find(c => c.id === selected);
    const body = {
      campeonatoId: selected,
      equiposId: campeonato?.equipos.map(e => e.id),
    };
    const tablaCronograma = await fetchWrapper.post<Cronograma[]>('/cronograma/generar', body);
    console.log(tablaCronograma);
    setTablaCronograma(tablaCronograma);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="py-5 flex border-b">
        <div className="w-1/4">
          <Select
            label="Campeonato"
            options={campeonatos.map(c => ({ label: `${c.nombre} ${c.categoria.nombre}`, value: c.id }))}
            value={selected}
            onChange={(v) => setSelected(Number(v))}
          />
        </div>
      </section>
      <section className="flex flex-col">
        {loading && (
          <div className="flex justify-center items-center">
            <Spinner color="primary" size="lg" />
          </div>
        )}
        {!loading && tablaCronograma && tablaCronograma.length === 0 && (
          <div className="bg-gray-100 rounded-md flex flex-col justify-center items-center py-10 gap-3">
            <p className="text-base font-medium text-gray-900">No existe un cronograma para este campeonato</p>
            <div>
              <Button type="button" onClick={generateFixure}>
                Generar Cronograma
              </Button>
            </div>
          </div>
        )}
        {!loading && tablaCronograma && tablaCronograma.length > 0 && (
          <section className="overflow-auto grid grid-cols-2 gap-x-20">
            {tablaCronograma.map(t => (
              <article key={t.id} className="flex px-4 py-2 gap-5 border-b cursor-pointer hover:bg-gray-100 items-center" onClick={() => {
                if (!t.resultado) {
                  navigate(t.fechaEncuentro ? `/resultado-form?id=${t.id}` : `/cronograma-form?id=${t.id}`);
                }
              }}>
                <div className="flex-1 flex flex-col">
                  <p className="text-sm font-semibold text-gray-700 ">{t.equipoLocal.nombre}</p>
                  <p className="text-sm font-semibold text-gray-700 ">{t.equipoVisitante.nombre}</p>
                </div>
                <div className="flex flex-col w-20">
                  <p className="text-sm font-normal text-gray-900">{t.resultado ? t.resultado.golesLocal : '--'}</p>
                  <p className="text-sm font-normal text-gray-900">{t.resultado ? t.resultado.golesVisitante : '--'}</p>
                </div>
                <div className="flex flex-col w-24">
                  <p className="text-xs font-medium text-gray-800 text-center">
                    {t.fechaEncuentro ? dayjs(t.fechaEncuentro).format('DD/MM/YY HH:mm') : 'Por definirse'}
                  </p>
                  {t.cancha &&
                    <p className="text-xs font-light text-gray-700 text-center line-clamp-1">
                      {t.cancha.nombre}
                    </p>
                  }
                </div>

              </article>
            ))}
          </section>
        )}
      </section>
    </div>
  );
};
