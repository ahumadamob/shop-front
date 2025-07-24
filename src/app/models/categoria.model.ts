export interface Categoria {
  id: number;
  nombre: string;
  parent?: Categoria;
}
