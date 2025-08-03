import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Picture } from '../models/picture.model';

@Injectable({ providedIn: 'root' })
export class PictureService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPictures(): Observable<Picture[]> {
    return this.http
      .get<{ data: Picture[] }>(`${this.baseUrl}/pictures`)
      .pipe(map((resp) => resp.data));
  }

  getPicture(id: number): Observable<Picture> {
    return this.http
      .get<{ data: Picture }>(`${this.baseUrl}/pictures/${id}`)
      .pipe(map((resp) => resp.data));
  }

  createPicture(file: File, order?: number, cover?: boolean): Observable<Picture> {
    const formData = new FormData();
    formData.append('file', file);

    let params = new HttpParams();
    if (order !== undefined) {
      params = params.set('order', order.toString());
    }
    if (cover !== undefined) {
      params = params.set('cover', cover.toString());
    }

    return this.http
      .post<{ data: Picture }>(`${this.baseUrl}/pictures`, formData, { params })
      .pipe(map((resp) => resp.data));
  }

  updatePicture(
    id: number,
    file: File,
    order?: number,
    cover?: boolean
  ): Observable<Picture> {
    const formData = new FormData();
    formData.append('file', file);

    let params = new HttpParams();
    if (order !== undefined) {
      params = params.set('order', order.toString());
    }
    if (cover !== undefined) {
      params = params.set('cover', cover.toString());
    }

    return this.http
      .put<{ data: Picture }>(`${this.baseUrl}/pictures/${id}`, formData, { params })
      .pipe(map((resp) => resp.data));
  }

  deletePicture(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/pictures/${id}`)
      .pipe(map(() => undefined));
  }
}
