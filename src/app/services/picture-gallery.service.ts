import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  PictureGallery,
  PictureGalleryRequest
} from '../models/picture-gallery.model';

@Injectable({ providedIn: 'root' })
export class PictureGalleryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getGalleries(): Observable<PictureGallery[]> {
    return this.http
      .get<{ data: PictureGallery[] }>(`${this.baseUrl}/picture-galleries`)
      .pipe(map((resp) => resp.data));
  }

  getGallery(id: number): Observable<PictureGallery> {
    return this.http
      .get<{ data: PictureGallery }>(`${this.baseUrl}/picture-galleries/${id}`)
      .pipe(map((resp) => resp.data));
  }

  createGallery(req: PictureGalleryRequest): Observable<PictureGallery> {
    return this.http
      .post<{ data: PictureGallery }>(
        `${this.baseUrl}/picture-galleries`,
        req
      )
      .pipe(map((resp) => resp.data));
  }

  updateGallery(
    id: number,
    req: PictureGalleryRequest
  ): Observable<PictureGallery> {
    return this.http
      .put<{ data: PictureGallery }>(
        `${this.baseUrl}/picture-galleries/${id}`,
        req
      )
      .pipe(map((resp) => resp.data));
  }

  deleteGallery(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/picture-galleries/${id}`)
      .pipe(map(() => undefined));
  }
}
