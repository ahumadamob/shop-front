import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Picture, PictureRequest } from '../models/picture.model';

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

  createPicture(req: PictureRequest): Observable<Picture> {
    return this.http
      .post<{ data: Picture }>(`${this.baseUrl}/pictures`, req)
      .pipe(map((resp) => resp.data));
  }

  updatePicture(id: number, req: PictureRequest): Observable<Picture> {
    return this.http
      .put<{ data: Picture }>(`${this.baseUrl}/pictures/${id}`, req)
      .pipe(map((resp) => resp.data));
  }

  deletePicture(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/pictures/${id}`)
      .pipe(map(() => undefined));
  }
}
