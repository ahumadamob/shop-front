export interface Producto {
  id: number;
  nombre: string;
  categorias: import('./categoria.model').Categoria[];
}

export interface ProductoRequest {
  nombre: string;
  categoriaIds: number[];
}
