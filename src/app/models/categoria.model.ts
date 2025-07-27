export interface Categoria {
  id: number;
  nombre: string;
  path: string;
  parent?: Categoria;
}

export interface CategoriaRequest {
  nombre: string;
  parentId?: number;
}
