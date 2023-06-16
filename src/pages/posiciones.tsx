import React, { useEffect, useState } from 'react';
import { Button } from "../components/common/button";
import { Select } from "../components/common/select";
import { Spinner } from "../components/spinnner";
import { TableBuilder } from "../components/table_builder";
import { Campeonato, Posicion } from "../interfaces";
import { fetchWrapper } from "../lib/fetch-wrapper";

const COLUMNS = [
  '#',
  'Equipo',
  'PJ',
  'GF',
  'GC',
  'Pts'
];


export const Posiciones = () => {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [tablaPosiciones, setTablaPosiciones] = useState<Posicion[]>();
  const [selected, setSelected] = useState<number>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (selected) {
      fetchWrapper.get<Posicion[]>(`/posiciones/${selected}`)
        .then((values) => {
          console.log(values);
          setTablaPosiciones(values);
        });
    }
  }, [selected]);

  const getData = async (signal?: AbortSignal) => {
    const values = await fetchWrapper.get<Campeonato[]>(`/campeonato`, signal);
    setCampeonatos(values);
  };

  const generarTabla = async () => {
    setLoading(true);
    const campeonato = campeonatos.find(c => c.id === selected);
    const body = {
      campeonatoId: selected,
      equiposId: campeonato?.equipos.map(e => e.id),
    };
    const generateTable = await fetchWrapper.post<Posicion[]>("/posiciones/generate", body);
    setTablaPosiciones(generateTable);
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
        {!loading && tablaPosiciones && tablaPosiciones.length === 0 &&
          <div className="bg-gray-100 rounded-md flex flex-col justify-center items-center py-10 gap-3">
            <p className="text-base font-medium text-gray-900">No existe una tabla de posiciones para este campeonato</p>
            <div>
              <Button type="button" onClick={generarTabla}>
                Generar Tabla
              </Button>
            </div>
          </div>
        }
        {!loading && tablaPosiciones && tablaPosiciones.length > 0 && (
          <section className="overflow-auto h-full border-b">
            <TableBuilder
              columns={COLUMNS}
              rowBuilder={() => tablaPosiciones.map((t, i) => {
                return (
                  <tr key={t.id} className="text-left text-sm font-normal text-gray-900">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{t.equipo.nombre}</td>
                    <td className="p-2">{t.partidosJugados}</td>
                    <td className="p-2">{t.golesAFavor}</td>
                    <td className="p-2">{t.golesEnContra}</td>
                    <td className="p-2">{t.puntos}</td>
                    {/* <td className="flex gap-2">
                          <div>
                            <Button type="button" color="success" onClick={() => navigate(`/campeonato-form?id=${c.id}`)}>
                              <i className="las la-pen la-lg" />
                            </Button>
                          </div>
                          <div>
                            <BtnDeletaConfirmDialog
                              title="Eliminar"
                              subtitle={`¿Esta seguro que desea eliminar el campeonato ${c.nombre}?`}
                              onConfirm={() => onDelete(c.id)}
                            />
                          </div>
                        </td> */}
                  </tr>
                );
              })}
            />
          </section>
        )}
      </section>
    </div>
  );
};
