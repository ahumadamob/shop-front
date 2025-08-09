import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ProductoAtributo,
  ProductoAtributoRequest
} from '../models/producto-atributo.model';

@Injectable({ providedIn: 'root' })
export class ProductoAtributoService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getByProducto(productoId: number): Observable<ProductoAtributo[]> {
    return this.http
      .get<{ data: ProductoAtributo[] }>(`${this.baseUrl}/producto-atributos`)
      .pipe(
        map((resp) => resp.data.filter((pa) => pa.productoId === productoId))
      );
  }

  create(req: ProductoAtributoRequest): Observable<ProductoAtributo> {
    return this.http
      .post<{ data: ProductoAtributo }>(`${this.baseUrl}/producto-atributos`, req)
      .pipe(map((resp) => resp.data));
  }

  update(
    id: number,
    req: ProductoAtributoRequest
  ): Observable<ProductoAtributo> {
    return this.http
      .put<{ data: ProductoAtributo }>(`${this.baseUrl}/producto-atributos/${id}`, req)
      .pipe(map((resp) => resp.data));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/producto-atributos/${id}`)
      .pipe(map(() => undefined));
  }
}
