import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
              <th scope="col">Path</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of categorias">
              <th scope="row">{{ c.id }}</th>
              <td>{{ c.nombre }}</td>
              <td>{{ c.path }}</td>
              <td>
                <button type="button" class="btn btn-primary me-2" (click)="editCategoria(c.id)">Editar</button>
                <button type="button" class="btn btn-danger" (click)="confirmDelete(c.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!categorias.length">No hay categorias.</p>
      </div>
    </div>

    <div class="modal show d-block" tabindex="-1" *ngIf="deleteId !== null">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="closeDeleteModal()">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Desea eliminar la categoría seleccionada?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" (click)="performDelete()">Eliminar</button>
            <button type="button" class="btn btn-secondary" (click)="closeDeleteModal()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="deleteId !== null"></div>
  `,
  styles: []
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  deleteId: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((data) => (this.categorias = data));
  }


  confirmDelete(id: number): void {
    this.deleteId = id;
  }

  closeDeleteModal(): void {
    this.deleteId = null;
  }

  performDelete(): void {
    if (this.deleteId === null) return;
    this.categoriaService
      .deleteCategoria(this.deleteId)
      .subscribe(() => {
        this.deleteId = null;
        this.loadCategorias();
      });
  }

  editCategoria(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
