export interface Picture {
  id: number;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  order?: number;
  cover: boolean;
  createdDate: string;
}

export interface PictureRequest {
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  order?: number;
  cover: boolean;
}
