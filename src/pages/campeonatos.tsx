import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BtnDeletaConfirmDialog } from "../components/common/btn_delete_confirmation_dialog";
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { Spinner } from "../components/spinnner";
import { TableBuilder } from "../components/table_builder";
import { Campeonato } from "../interfaces";
import { fetchWrapper } from "../lib/fetch-wrapper";

const COLUMNS = [
  '#',
  'Nombre',
  'Categoria',
  'Fecha Inicio',
  'Fecha Fin',
  'Equipos',
  ''
];

export const Campeonatos = () => {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    getData()
      .then(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const getData = async (signal?: AbortSignal) => {
    const values = await fetchWrapper.get<Campeonato[]>('/campeonato', signal);
    setCampeonatos(values);
  };

  const onDelete = async (id: number) => {
    setLoading(true);
    await fetchWrapper.delete<Campeonato>(`/campeonato/${id}`);
    await getData();
    setLoading(false);
  };

  const filterList = () => campeonatos.filter(c => {
    const lower = filter.toLowerCase();
    return c.nombre.toLowerCase().includes(lower) || c.categoria.nombre.toLowerCase().includes(lower);
  });


  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between">
        <div>
          <Link to="/campeonato-form">
            <Button type="button" title="Nuevo">Nuevo</Button>
          </Link>
        </div>
        <div className="w-1/3">
          <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar..." />
        </div>
      </section>
      <section className="h-[600px] overflow-auto">
        <TableBuilder
          columns={COLUMNS}
          rowBuilder={() => filterList().map(c => {
            return (
              <tr key={c.id} className="text-left text-sm font-normal text-gray-900">
                <td className="p-2">{c.id}</td>
                <td className="p-2">{c.nombre}</td>
                <td className="p-2">{c.categoria.nombre}</td>
                <td className="p-2">{dayjs(c.fechaInicio).format('DD/MM/YYYY')}</td>
                <td className="p-2">{dayjs(c.fechaFin).format('DD/MM/YYYY')}</td>
                <td className="p-2">{c.equipos.length}</td>
                <td className="flex gap-2">
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
                </td>
              </tr>
            );
          })}
        />
      </section>
    </div>
  );
};
