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
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input class="form-control" [(ngModel)]="categoria.nombre" name="nombre" />
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
    if (this.isEdit && idParam) {
      this.service
        .updateCategoria(Number(idParam), this.categoria)
        .subscribe(() => this.volver());
    } else {
      this.service.createCategoria(this.categoria).subscribe(() => this.volver());
    }
  }

  volver(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
