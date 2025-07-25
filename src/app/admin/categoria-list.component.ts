import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { Categoria, CategoriaRequest } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Categorías</h2>

    <div *ngIf="showAddForm" class="card card-body mb-3">
      <h5>Nueva Categoría</h5>
      <form (ngSubmit)="addCategoria()">
        <div class="mb-2">
          <label class="form-label">Nombre</label>
          <input class="form-control" [(ngModel)]="newCategoria.nombre" name="nombre" />
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-secondary ms-2" (click)="showAddForm=false">Cancelar</button>
      </form>
    </div>

    <div *ngIf="editCategoria" class="card card-body mb-3">
      <h5>Editar Categoría</h5>
      <form (ngSubmit)="updateCategoria()">
        <div class="mb-2">
          <label class="form-label">Nombre</label>
          <input class="form-control" [(ngModel)]="editCategoria.nombre" name="editNombre" />
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
        <button type="button" class="btn btn-secondary ms-2" (click)="cancelEdit()">Cancelar</button>
      </form>
    </div>

    <button class="btn btn-primary mb-3" (click)="showAddForm=true">Agregar Categoría</button>

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
            <button class="btn btn-sm btn-outline-primary me-2" (click)="startEdit(c)">Editar</button>
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
  newCategoria: CategoriaRequest = { nombre: '' };
  editCategoria: Categoria | null = null;
  showAddForm = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe(data => (this.categorias = data));
  }

  addCategoria(): void {
    this.categoriaService.createCategoria(this.newCategoria).subscribe(() => {
      this.showAddForm = false;
      this.newCategoria = { nombre: '' };
      this.loadCategorias();
    });
  }

  startEdit(c: Categoria): void {
    this.editCategoria = { ...c };
  }

  cancelEdit(): void {
    this.editCategoria = null;
  }

  updateCategoria(): void {
    if (!this.editCategoria) return;
    const req: CategoriaRequest = { nombre: this.editCategoria.nombre };
    if (this.editCategoria.parent?.id) req.parentId = this.editCategoria.parent.id;
    this.categoriaService
      .updateCategoria(this.editCategoria.id, req)
      .subscribe(() => {
        this.editCategoria = null;
        this.loadCategorias();
      });
  }

  deleteCategoria(id: number): void {
    if (!confirm('¿Eliminar categoría?')) return;
    this.categoriaService.deleteCategoria(id).subscribe(() => this.loadCategorias());
  }
}
