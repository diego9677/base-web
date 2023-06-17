import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { Select } from "../components/common/select";
import { Spinner } from "../components/spinnner";
import { Arbitro, Cancha, Cronograma } from "../interfaces";
import { fetchWrapper } from "../lib/fetch-wrapper";

type FormState = {
  canchaId?: number;
  arbitroId?: number;
  fecha?: string;
  hora?: string;
};

const initState: FormState = {
  canchaId: 0,
  arbitroId: 0,
  fecha: "",
  hora: ""
};

export const CronogramaForm = () => {
  const [formData, setFormData] = useState<FormState>(initState);
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [arbitros, setArbitros] = useState<Arbitro[]>([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [campId, setCampId] = useState<number>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      fetchWrapper.get<Cancha[]>('/cancha', controller.signal),
      fetchWrapper.get<Arbitro[]>('/arbitro', controller.signal)
    ])
      .then(([canchas, arbitros]) => {
        setCanchas(canchas);
        setArbitros(arbitros);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (id) {
      fetchWrapper.get<Cronograma>(`/cronograma/${id}`, controller.signal)
        .then((value) => {
          setCampId(value.campeonatoId);
          setFormData({
            canchaId: value.canchaId,
            arbitroId: value.arbitroId,
            fecha: value.fechaEncuentro ? dayjs(value.fechaEncuentro).format('YYYY-MM-DD') : "",
            hora: value.fechaEncuentro ? dayjs(value.fechaEncuentro).format('HH:mm') : "",
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
    const body = {
      canchaId: formData.canchaId,
      arbitroId: formData.arbitroId,
      fechaEncuentro: `${formData.fecha}T${formData.hora}:00Z`
    };

    if (id) {
      const updated = await fetchWrapper.put(`/cronograma/${id}`, body);
    }
    setBtnLoading(false);
    navigate(`/cronograma?campId=${campId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <form className="mx-auto w-1/2 flex flex-col gap-6 h-full overflow-auto px-4" onSubmit={onSubmit}>
      <Select
        label="Cancha"
        options={canchas.map(c => ({ label: c.nombre, value: c.id }))}
        value={formData.canchaId}
        onChange={(v) => setFormData({ ...formData, canchaId: Number(v) })}
      />

      <Select
        label="Arbitro"
        options={arbitros.map(a => ({ label: `${a.persona.nombres} ${a.persona.apellidos}`, value: a.id }))}
        value={formData.arbitroId}
        onChange={(v) => setFormData({ ...formData, arbitroId: Number(v) })}
      />

      <Input
        type="date"
        label="Fecha"
        value={formData.fecha}
        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
      />

      <Input
        type="time"
        label="Hora"
        value={formData.hora}
        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
      />

      {/* <p>Para asignar el resultado ir&nbsp;
        <Link to="">aqui</Link>
      </p> */}

      <div className="flex gap-4">
        <Button type="button" color="secondary" onClick={() => navigate(`/cronograma?campId=${campId}`)}>
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          {btnLoading ? <Spinner color="white" size="md" /> : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
