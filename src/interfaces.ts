
export interface Campeonato {
  id: number;
  nombre: string;
  categoriaId: number;
  fechaInicio: string;
  fechaFin: string;
  categoria: Categoria;
  equipos: Equipo[];
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  edadInicio: number;
  edadFin: number;
}

export interface Equipo {
  id: number;
  nombre: string;
  direccion: string;
  fechaFundacion: string;
  escudo: string;
}

export interface Posicion {
  id: number;
  partidosJugados: number;
  golesAFavor: number;
  golesEnContra: number;
  puntos: number;
  equipoId: number;
  equipo: Equipo;
}

export interface Cronograma {
  id: number;
  campeonatoId: number;
  equipoLocalId: number;
  equipoVisitanteId: number;
  fechaEncuentro?: string;
  canchaId?: number;
  resultadoId?: number;
  arbitroId?: number;
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
  campeonato: Campeonato;
  cancha?: Cancha;
  arbitro?: Arbitro;
  resultado?: Resultado;
}

export interface Resultado {
  id: number;
  tarjetasAmarillas: number;
  tarjetasRojas: number;
  golesLocal: number;
  golesVisitante: number;
}

export interface Cancha {
  id: number;
  nombre: string;
  direccion: string;
}

export interface Arbitro {
  id: number;
  personaId: number;
  persona: Persona;
}

export interface Persona {
  id: number;
  ci: string;
  nombres: string;
  apellidos: string;
}