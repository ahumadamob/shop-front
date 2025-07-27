import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card border-secondary mb-3">
      <h3 class="card-header">Productos</h3>
      <div class="card-body">
        <div class="mb-3 text-end">
          <a routerLink="nuevo" class="btn btn-success">Nuevo Producto</a>
        </div>

        <table class="table table-hover" *ngIf="productos.length">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categorías</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of productos">
              <th scope="row">{{ p.id }}</th>
              <td>{{ p.nombre }}</td>
              <td>{{ p.categorias.map(c => c.nombre).join(', ') }}</td>
              <td>
                <button type="button" class="btn btn-primary me-2" (click)="editProducto(p.id)">Editar</button>
                <button type="button" class="btn btn-danger" (click)="confirmDelete(p.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!productos.length">No hay productos.</p>
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
            <p>¿Desea eliminar el producto seleccionado?</p>
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
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  deleteId: number | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService
      .getProductos()
      .subscribe((data) => (this.productos = data));
  }

  confirmDelete(id: number): void {
    this.deleteId = id;
  }

  closeDeleteModal(): void {
    this.deleteId = null;
  }

  performDelete(): void {
    if (this.deleteId === null) return;
    this.productoService
      .deleteProducto(this.deleteId)
      .subscribe(() => {
        this.deleteId = null;
        this.loadProductos();
      });
  }

  editProducto(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
