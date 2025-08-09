export interface ProductoAtributo {
  id: number;
  productoId: number;
  catalogoAtributo: import('./catalogo-atributo.model').CatalogoAtributo;
  valor: any;
}

export interface ProductoAtributoRequest {
  productoId: number;
  catalogoAtributoId: number;
  valor: string;
}
