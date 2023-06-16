import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { MultiSelectCompare } from "../components/common/multi_select_compare";
import { Select } from "../components/common/select";
import { Spinner } from "../components/spinnner";
import { Campeonato, Categoria, Equipo } from "../interfaces";
import { fetchWrapper } from "../lib/fetch-wrapper";

type FormState = {
  nombre: string;
  categoriaId: number;
  fechaInicio: string;
  fechaFin: string;
  equiposId: number[];
};

const initState: FormState = {
  nombre: "",
  categoriaId: 0,
  fechaInicio: "",
  fechaFin: "",
  equiposId: []
};

export const CampeonatoForm = () => {
  const [formData, setFormData] = useState<FormState>(initState);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchWrapper.get<Categoria[]>('/categoria', controller.signal),
      fetchWrapper.get<Equipo[]>('/equipo', controller.signal)
    ])
      .then(([categorias, equipos]) => {
        setCategorias(categorias);
        setEquipos(equipos);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (id) {
      fetchWrapper.get<Campeonato>(`/campeonato/${id}`, controller.signal)
        .then((value) => {
          setFormData({
            nombre: value.nombre,
            categoriaId: value.categoriaId,
            fechaInicio: dayjs(value.fechaInicio).format('YYYY-MM-DD'),
            fechaFin: dayjs(value.fechaFin).format('YYYY-MM-DD'),
            equiposId: value.equipos.map(e => e.id),
          });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);
    if (id) {
      const updated = await fetchWrapper.put(`/campeonato/${id}`, formData);
    } else {
      const created = await fetchWrapper.post('/campeonato', formData);
    }
    setBtnLoading(false);
    navigate("/campeonato");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

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
        options={categorias.map(c => ({ label: c.nombre, value: c.id }))}
        value={formData.categoriaId}
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

      <MultiSelectCompare
        label="Equipos"
        selected={formData.equiposId}
        options={equipos.map(e => ({ label: e.nombre, value: e.id }))}
        onChange={(v) => setFormData({ ...formData, equiposId: v })}
      />


      <div className="flex gap-4">
        <Button type="button" color="secondary" onClick={() => navigate('/campeonato')}>
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          {btnLoading ? <Spinner color="white" size="md" /> : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
