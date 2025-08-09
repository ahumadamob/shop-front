import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CatalogoAtributoService } from '../services/catalogo-atributo.service';
import { CatalogoAtributo } from '../models/catalogo-atributo.model';

@Component({
  selector: 'app-catalogo-atributo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card border-secondary mb-3">
      <h3 class="card-header">Catálogo de Atributos</h3>
      <div class="card-body">
        <div class="mb-3 text-end">
          <a routerLink="nuevo" class="btn btn-success">Nuevo Atributo</a>
        </div>

        <table class="table table-hover" *ngIf="atributos.length">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Activo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of atributos">
              <th scope="row">{{ a.id }}</th>
              <td>{{ a.nombre }}</td>
              <td>{{ a.dataType }}</td>
              <td>{{ a.activo ? 'Sí' : 'No' }}</td>
              <td>
                <button type="button" class="btn btn-primary me-2" (click)="editAtributo(a.id)">Editar</button>
                <button type="button" class="btn btn-danger" (click)="confirmDelete(a.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!atributos.length">No hay atributos.</p>
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
            <p>¿Desea eliminar el atributo seleccionado?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" (click)="performDelete()">Eliminar</button>
            <button type="button" class="btn btn-success" (click)="closeDeleteModal()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="deleteId !== null"></div>
  `,
  styles: []
})
export class CatalogoAtributoListComponent implements OnInit {
  atributos: CatalogoAtributo[] = [];
  deleteId: number | null = null;

  constructor(
    private service: CatalogoAtributoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAtributos();
  }

  loadAtributos(): void {
    this.service.getCatalogoAtributos().subscribe((data) => (this.atributos = data));
  }

  editAtributo(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  confirmDelete(id: number): void {
    this.deleteId = id;
  }

  closeDeleteModal(): void {
    this.deleteId = null;
  }

  performDelete(): void {
    if (this.deleteId === null) return;
    this.service.deleteCatalogoAtributo(this.deleteId).subscribe({
      next: () => {
        this.deleteId = null;
        this.loadAtributos();
      }
    });
  }
}
