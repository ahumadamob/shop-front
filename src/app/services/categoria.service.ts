import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria, CategoriaRequest } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http
      .get<{ data: Categoria[] }>(`${this.baseUrl}/categorias`)
      .pipe(map((resp) => resp.data));
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http
      .get<{ data: Categoria }>(`${this.baseUrl}/categorias/${id}`)
      .pipe(map((resp) => resp.data));
  }

  createCategoria(req: CategoriaRequest): Observable<Categoria> {
    return this.http
      .post<{ data: Categoria }>(`${this.baseUrl}/categorias`, req)
      .pipe(map((resp) => resp.data));
  }

  updateCategoria(id: number, req: CategoriaRequest): Observable<Categoria> {
    return this.http
      .put<{ data: Categoria }>(`${this.baseUrl}/categorias/${id}`, req)
      .pipe(map((resp) => resp.data));
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/categorias/${id}`)
      .pipe(map(() => undefined));
  }
}
