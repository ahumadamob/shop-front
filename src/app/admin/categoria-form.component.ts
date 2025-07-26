import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { CategoriaRequest } from '../models/categoria.model';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>{{ isEdit ? 'Editar Categoría' : 'Nueva Categoría' }}</h2>
    <form (ngSubmit)="submit()" *ngIf="categoria">
      <div class="has-danger mb-3">
        <label class="form-label" for="nombre">Nombre</label>
        <input
          id="nombre"
          class="form-control"
          [ngClass]="{ 'is-invalid': errorMessages.nombre }"
          [(ngModel)]="categoria.nombre"
          name="nombre"
        />
        <div class="invalid-feedback" *ngIf="errorMessages.nombre">
          {{ errorMessages.nombre }}
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Guardar</button>
      <button class="btn btn-secondary ms-2" type="button" (click)="volver()">Cancelar</button>
    </form>
  `,
  styles: []
})
export class CategoriaFormComponent implements OnInit {
  categoria: CategoriaRequest = { nombre: '' };
  isEdit = false;
  errorMessages: Record<string, string> = {};

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.service
        .getCategoria(id)
        .subscribe((c) => (this.categoria = { nombre: c.nombre, parentId: c.parent?.id }));
    }
  }

  submit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.errorMessages = {};
    const obs = this.isEdit && idParam
      ? this.service.updateCategoria(Number(idParam), this.categoria)
      : this.service.createCategoria(this.categoria);
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
