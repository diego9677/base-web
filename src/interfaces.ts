
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