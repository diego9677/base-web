import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { TableBuilder } from "../components/table_builder";

const COLUMNS = [
  '#',
  'Nombre',
  'Dirección',
  'Categoria',
  'Equipos',
  ''
];

export const Campeonato = () => {
  const [campeonatos, setCampeonatos] = useState([]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex justify-between">
        <div>
          <Link to="/campeonato-form">
            <Button type="button" title="Nuevo">Nuevo</Button>
          </Link>
        </div>
        <div className="w-1/3">
          <Input type="text" onChange={(e) => { }} placeholder="Buscar..." />
        </div>
      </section>
      <section className="h-[600px] overflow-auto">
        <TableBuilder
          columns={COLUMNS}
          rowBuilder={() => <></>}
        />
      </section>
    </div>
  );
};
