import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card border-secondary mb-3">
      <h3 class="card-header">Categorias</h3>
      <div class="card-body">
        <div class="mb-3 text-end">
          <a routerLink="nueva" class="btn btn-success">Nueva Categoría</a>
        </div>

        <table class="table table-hover" *ngIf="categorias.length">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of categorias">
              <th scope="row">{{ c.id }}</th>
              <td>{{ c.nombre }}</td>
              <td>
                <a [routerLink]="[c.id]" class="btn btn-warning btn-sm me-2">Editar</a>
                <button class="btn btn-danger btn-sm" (click)="deleteCategoria(c.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!categorias.length">No hay categorias.</p>
      </div>
    </div>
  `,
  styles: []
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((data) => (this.categorias = data));
  }

  deleteCategoria(id: number): void {
    if (!confirm('¿Eliminar categoría?')) return;
    this.categoriaService.deleteCategoria(id).subscribe(() => this.loadCategorias());
  }
}
