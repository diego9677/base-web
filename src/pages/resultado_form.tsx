import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/common/button";
import { Input } from "../components/common/input";
import { Spinner } from "../components/spinnner";
import { fetchWrapper } from "../lib/fetch-wrapper";

type FormState = {
  tarjetasAmarillas: number;
  tarjetasRojas: number;
  golesLocal: number;
  golesVisitante: number;
};

const initState: FormState = {
  tarjetasAmarillas: 0,
  tarjetasRojas: 0,
  golesLocal: 0,
  golesVisitante: 0
};

export const ResultadoForm = () => {
  const [formData, setFormData] = useState<FormState>(initState);
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // useEffect(() => {
  //   const controller = new AbortController();

  //   if (id) {
  //     fetchWrapper.get<Cronograma>(`/cronograma/${id}`, controller.signal)
  //       .then((value) => {
  //         console.log(value);
  //         setFormData({
  //           canchaId: value.canchaId,
  //           arbitroId: value.arbitroId,
  //           fecha: dayjs(value.fechaEncuentro).format('YYYY-MM-DD'),
  //           hora: dayjs(value.fechaEncuentro).format('HH:mm'),
  //         });
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }

  //   return () => {
  //     controller.abort();
  //   };
  // }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    await fetchWrapper.post(`/resultado`, { ...formData, cronogramaId: Number(id) });

    setBtnLoading(false);
    navigate("/cronograma");
  };

  return (
    <form className="mx-auto w-1/2 flex flex-col gap-6 h-full overflow-auto px-4" onSubmit={onSubmit}>

      <Input
        type="number"
        label="Tarjetas Amarillas"
        value={formData.tarjetasAmarillas}
        onChange={(e) => setFormData({ ...formData, tarjetasAmarillas: Number(e.target.value) })}
      />

      <Input
        type="number"
        label="Tarjetas Rojas"
        value={formData.tarjetasRojas}
        onChange={(e) => setFormData({ ...formData, tarjetasRojas: Number(e.target.value) })}
      />


      <Input
        type="number"
        label="Goles local"
        value={formData.golesLocal}
        onChange={(e) => setFormData({ ...formData, golesLocal: Number(e.target.value) })}
      />


      <Input
        type="number"
        label="Goles Visitante"
        value={formData.golesVisitante}
        onChange={(e) => setFormData({ ...formData, golesVisitante: Number(e.target.value) })}
      />

      <div className="flex gap-4">
        <Button type="button" color="secondary" onClick={() => navigate(`/cronograma`)}>
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          {btnLoading ? <Spinner color="white" size="md" /> : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
