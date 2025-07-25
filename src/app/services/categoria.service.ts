import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria, CategoriaRequest } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.baseUrl}/categorias/${id}`);
  }

  createCategoria(req: CategoriaRequest): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.baseUrl}/categorias`, req);
  }

  updateCategoria(id: number, req: CategoriaRequest): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.baseUrl}/categorias/${id}`, req);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categorias/${id}`);
  }
}
