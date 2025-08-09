import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CatalogoAtributo, CatalogoAtributoRequest } from '../models/catalogo-atributo.model';

@Injectable({ providedIn: 'root' })
export class CatalogoAtributoService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCatalogoAtributos(): Observable<CatalogoAtributo[]> {
    return this.http
      .get<{ data: CatalogoAtributo[] }>(`${this.baseUrl}/catalogo-atributos`)
      .pipe(map((resp) => resp.data));
  }

  getCatalogoAtributo(id: number): Observable<CatalogoAtributo> {
    return this.http
      .get<{ data: CatalogoAtributo }>(`${this.baseUrl}/catalogo-atributos/${id}`)
      .pipe(map((resp) => resp.data));
  }

  createCatalogoAtributo(req: CatalogoAtributoRequest): Observable<CatalogoAtributo> {
    return this.http
      .post<{ data: CatalogoAtributo }>(`${this.baseUrl}/catalogo-atributos`, req)
      .pipe(map((resp) => resp.data));
  }

  updateCatalogoAtributo(id: number, req: CatalogoAtributoRequest): Observable<CatalogoAtributo> {
    return this.http
      .put<{ data: CatalogoAtributo }>(`${this.baseUrl}/catalogo-atributos/${id}`, req)
      .pipe(map((resp) => resp.data));
  }

  deleteCatalogoAtributo(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/catalogo-atributos/${id}`)
      .pipe(map(() => undefined));
  }
}
