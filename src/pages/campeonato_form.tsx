import React from 'react';
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { Select } from "../components/common/select";

export const CampeonatoForm = () => {
  return (
    <div>
      <form className="w-1/3 flex flex-col gap-6">
        <Input
          type="text"
          label="Nombre"
          placeholder="Ej: Sub 20"
          onChange={() => { }}
        />

        <Select
          label="Categoria"
          options={[]}
          onChange={() => { }}
        />

        <Input
          type="date"
          label="Fecha Inicio"
          onChange={() => { }}
        />

        <Input
          type="date"
          label="Fecha Fin"
          onChange={() => { }}
        />



        <div className="flex gap-4">
          <Button type="button" color="secondary">
            Cancelar
          </Button>
          <Button type="button" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};
