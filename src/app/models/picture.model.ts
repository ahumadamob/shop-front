export interface Picture {
  id: number;
  url: string;
  path: string;
  fileName: string;
  mimeType: string;
  size: number;
  order?: number;
  cover: boolean;
  createdDate: string;
}

export interface PictureRequest {
  url: string;
  path?: string;
  fileName: string;
  mimeType: string;
  size: number;
  order?: number;
  cover: boolean;
}
