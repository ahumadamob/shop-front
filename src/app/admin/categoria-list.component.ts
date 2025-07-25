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
    <h2>Categorías</h2>

    <a routerLink="nueva" class="btn btn-primary mb-3">Nueva Categoría</a>

    <table class="table table-bordered" *ngIf="categorias.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of categorias">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>
            <a [routerLink]="[c.id]" class="btn btn-sm btn-outline-primary me-2">Editar</a>
            <button class="btn btn-sm btn-outline-danger" (click)="deleteCategoria(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="!categorias.length">No hay categorias.</p>
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
