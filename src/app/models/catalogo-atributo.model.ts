export type DataType = 'TEXT' | 'NUMERIC' | 'BOOLEAN' | 'DATE';

export interface CatalogoAtributo {
  id: number;
  nombre: string;
  dataType: DataType;
  unidad?: string;
  descripcion?: string;
  orden?: number;
  valorMin?: number;
  valorMax?: number;
  activo: boolean;
}

export interface CatalogoAtributoRequest {
  nombre: string;
  dataType: DataType;
  unidad?: string;
  descripcion?: string;
  orden?: number;
  valorMin?: number;
  valorMax?: number;
  activo: boolean;
  validRange?: boolean;
}
