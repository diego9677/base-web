import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { Select } from "../components/common/select";

const initState = {
  nombre: "",
  categoriaId: 0,
  fechaInicio: "",
  fechaFin: "",
};

const initCategories = [
  { label: "Categoria 1", value: 1 },
  { label: "Categoria 2", value: 2 },
  { label: "Categoria 3", value: 3 }
];

export const CampeonatoForm = () => {
  const [formData, setFormData] = useState(initState);
  const [categorias, setCategorias] = useState(initCategories);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    navigate("/campeonato");
  };

  return (
    <form className="mx-auto w-1/3 flex flex-col gap-6" onSubmit={onSubmit}>
      <h3 className="text-lg font-medium text-gray-800">Nuevo Campeonato</h3>
      <Input
        type="text"
        label="Nombre"
        placeholder="Ej: Sub 20"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />

      <Select
        label="Categoria"
        options={categorias}
        onChange={(v) => setFormData({ ...formData, categoriaId: Number(v) })}
      />

      <Input
        type="date"
        label="Fecha Inicio"
        value={formData.fechaInicio}
        onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
      />

      <Input
        type="date"
        label="Fecha Fin"
        value={formData.fechaFin}
        onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
      />



      <div className="flex gap-4">
        <Button type="button" color="secondary" onClick={() => navigate('/campeonato')}>
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Guardar
        </Button>
      </div>
    </form>
  );
};
