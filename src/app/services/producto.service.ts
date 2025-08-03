import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto, ProductoRequest } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http
      .get<{ data: Producto[] }>(`${this.baseUrl}/productos`)
      .pipe(map((resp) => resp.data));
  }

  getProducto(id: number): Observable<Producto> {
    return this.http
      .get<{ data: Producto }>(`${this.baseUrl}/productos/${id}`)
      .pipe(map((resp) => resp.data));
  }

  createProducto(req: ProductoRequest): Observable<Producto> {
    return this.http
      .post<{ data: Producto }>(`${this.baseUrl}/productos`, req)
      .pipe(map((resp) => resp.data));
  }

  updateProducto(id: number, req: ProductoRequest): Observable<Producto> {
    return this.http
      .put<{ data: Producto }>(`${this.baseUrl}/productos/${id}`, req)
      .pipe(map((resp) => resp.data));
  }

  deleteProducto(id: number): Observable<void> {
    return this.http
      .delete<{ data: void }>(`${this.baseUrl}/productos/${id}`)
      .pipe(map(() => undefined));
  }
}
