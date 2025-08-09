import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CatalogoAtributoService } from '../services/catalogo-atributo.service';
import { CatalogoAtributoRequest } from '../models/catalogo-atributo.model';

@Component({
  selector: 'app-catalogo-atributo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>{{ isEdit ? 'Editar Atributo' : 'Nuevo Atributo' }}</h2>
    <form (ngSubmit)="submit()" *ngIf="atributo">
      <div class="has-danger mb-3">
        <label class="form-label" for="nombre">Nombre</label>
        <input
          id="nombre"
          class="form-control"
          [ngClass]="{ 'is-invalid': errorMessages.nombre }"
          [(ngModel)]="atributo.nombre"
          name="nombre"
        />
        <div class="invalid-feedback" *ngIf="errorMessages.nombre">
          {{ errorMessages.nombre }}
        </div>
      </div>
      <div class="has-danger mb-3">
        <label class="form-label" for="dataType">Tipo de Dato</label>
        <select
          id="dataType"
          class="form-select"
          [ngClass]="{ 'is-invalid': errorMessages.dataType }"
          [(ngModel)]="atributo.dataType"
          name="dataType"
        >
          <option value="TEXT">TEXT</option>
          <option value="NUMERIC">NUMERIC</option>
          <option value="BOOLEAN">BOOLEAN</option>
          <option value="DATE">DATE</option>
        </select>
        <div class="invalid-feedback" *ngIf="errorMessages.dataType">
          {{ errorMessages.dataType }}
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="unidad">Unidad</label>
        <input id="unidad" class="form-control" [(ngModel)]="atributo.unidad" name="unidad" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="descripcion">Descripción</label>
        <input id="descripcion" class="form-control" [(ngModel)]="atributo.descripcion" name="descripcion" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="orden">Orden</label>
        <input id="orden" type="number" class="form-control" [(ngModel)]="atributo.orden" name="orden" />
      </div>
      <div class="mb-3 form-check">
        <input id="activo" type="checkbox" class="form-check-input" [(ngModel)]="atributo.activo" name="activo" />
        <label class="form-check-label" for="activo">Activo</label>
      </div>
      <div class="mb-3 form-check">
        <input id="validRange" type="checkbox" class="form-check-input" [(ngModel)]="atributo.validRange" name="validRange" />
        <label class="form-check-label" for="validRange">Validar rango</label>
      </div>
      <div class="mb-3" *ngIf="atributo.validRange">
        <label class="form-label" for="valorMin">Valor Mínimo</label>
        <input id="valorMin" type="number" class="form-control" [(ngModel)]="atributo.valorMin" name="valorMin" />
        <label class="form-label mt-2" for="valorMax">Valor Máximo</label>
        <input id="valorMax" type="number" class="form-control" [(ngModel)]="atributo.valorMax" name="valorMax" />
      </div>
      <button class="btn btn-primary" type="submit">Guardar</button>
      <button class="btn btn-secondary ms-2" type="button" (click)="volver()">Cancelar</button>
    </form>
  `,
  styles: []
})
export class CatalogoAtributoFormComponent implements OnInit {
  atributo: CatalogoAtributoRequest = { nombre: '', dataType: 'TEXT', activo: true };
  isEdit = false;
  errorMessages: Record<string, string> = {};

  constructor(
    private service: CatalogoAtributoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.service.getCatalogoAtributo(id).subscribe((a) => {
        this.atributo = {
          nombre: a.nombre,
          dataType: a.dataType,
          unidad: a.unidad,
          descripcion: a.descripcion,
          orden: a.orden,
          valorMin: a.valorMin,
          valorMax: a.valorMax,
          activo: a.activo,
          validRange: a.valorMin !== undefined || a.valorMax !== undefined
        };
      });
    }
  }

  submit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.errorMessages = {};
    const obs = this.isEdit && idParam
      ? this.service.updateCatalogoAtributo(Number(idParam), this.atributo)
      : this.service.createCatalogoAtributo(this.atributo);
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
