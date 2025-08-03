export interface Producto {
  id: number;
  nombre: string;
  categorias: import('./categoria.model').Categoria[];
  pictureGallery?: import('./picture-gallery.model').PictureGallery;
}

export interface ProductoRequest {
  nombre: string;
  categoriaIds: number[];
  pictureGalleryId?: number;
}
