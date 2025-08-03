import { Picture } from './picture.model';

export interface PictureGallery {
  id: number;
  description: string;
  pictures: Picture[];
}

export interface PictureGalleryRequest {
  description: string;
  pictureIds: number[];
}
