import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoRequest } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>{{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
    <form (ngSubmit)="submit()" *ngIf="producto">
      <div class="has-danger mb-3">
        <label class="form-label" for="nombre">Nombre</label>
        <input
          id="nombre"
          class="form-control"
          [ngClass]="{ 'is-invalid': errorMessages.nombre }"
          [(ngModel)]="producto.nombre"
          name="nombre"
        />
        <div class="invalid-feedback" *ngIf="errorMessages.nombre">
          {{ errorMessages.nombre }}
        </div>
      </div>
      <div class="has-danger mb-3">
        <label class="form-label" for="categoriaIds">Categorías</label>
        <select
          id="categoriaIds"
          multiple
          class="form-select"
          [ngClass]="{ 'is-invalid': errorMessages.categoriaIds }"
          [(ngModel)]="producto.categoriaIds"
          name="categoriaIds"
        >
          <option *ngFor="let cat of categorias" [ngValue]="cat.id">
            {{ cat.nombre }}
          </option>
        </select>
        <div class="invalid-feedback" *ngIf="errorMessages.categoriaIds">
          {{ errorMessages.categoriaIds }}
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Guardar</button>
      <button class="btn btn-secondary ms-2" type="button" (click)="volver()">
        Cancelar
      </button>
    </form>
  `,
  styles: []
})
export class ProductoFormComponent implements OnInit {
  producto: ProductoRequest = { nombre: '', categoriaIds: [] };
  isEdit = false;
  errorMessages: Record<string, string> = {};
  categorias: Categoria[] = [];

  constructor(
    private service: ProductoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((data) => (this.categorias = data));
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.service
        .getProducto(id)
        .subscribe(
          (p) =>
            (this.producto = {
              nombre: p.nombre,
              categoriaIds: p.categorias.map((c) => c.id)
            })
        );
    }
  }

  submit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.errorMessages = {};
    const obs =
      this.isEdit && idParam
        ? this.service.updateProducto(Number(idParam), this.producto)
        : this.service.createProducto(this.producto);
    obs.subscribe({
      next: () => this.volver(),
      error: (err) => this.handleErrors(err)
    });
  }

  volver(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private handleErrors(err: any): void {
    if (err.error && Array.isArray(err.error.errors)) {
      for (const e of err.error.errors) {
        this.errorMessages[e.field] = e.message;
      }
    }
  }
}
