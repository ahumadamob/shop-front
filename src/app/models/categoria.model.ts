export interface Categoria {
  id: number;
  nombre: string;
  parent?: Categoria;
}

export interface CategoriaRequest {
  nombre: string;
  parentId?: number;
}
