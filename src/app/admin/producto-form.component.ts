import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { PictureService } from '../services/picture.service';
import { PictureGalleryService } from '../services/picture-gallery.service';
import { ProductoRequest } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { PictureRequest } from '../models/picture.model';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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

      <div class="mb-3">
        <label class="form-label">Imágenes</label>
        <div
          class="border rounded p-2 mb-2"
          *ngFor="let pic of pictures; let i = index"
        >
          <div class="mb-2">
            <label class="form-label">Archivo</label>
            <input
              type="file"
              accept="image/*"
              class="form-control"
              (change)="onFileSelected($event, i)"
            />
          </div>
          <div *ngIf="pic.fileName">
            <div class="mb-2">
              <label class="form-label">Nombre archivo</label>
              <input
                class="form-control"
                [(ngModel)]="pic.fileName"
                name="fileName{{ i }}"
                readonly
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Mime Type</label>
              <input
                class="form-control"
                [(ngModel)]="pic.mimeType"
                name="mimeType{{ i }}"
                readonly
              />
            </div>
            <div class="mb-2">
              <label class="form-label">Tamaño</label>
              <input
                type="number"
                class="form-control"
                [(ngModel)]="pic.size"
                name="size{{ i }}"
                readonly
              />
            </div>
          </div>
          <div class="form-check mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              [(ngModel)]="pic.cover"
              name="cover{{ i }}"
            />
            <label class="form-check-label">Portada</label>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-danger"
            (click)="removePicture(i)"
          >
            Eliminar
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          (click)="addPicture()"
        >
          Agregar Imagen
        </button>
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
  pictures: PictureRequest[] = [];

  constructor(
    private service: ProductoService,
    private categoriaService: CategoriaService,
    private pictureService: PictureService,
    private pictureGalleryService: PictureGalleryService,
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
        .subscribe((p) => {
          this.producto = {
            nombre: p.nombre,
            categoriaIds: p.categorias.map((c) => c.id),
            pictureGalleryId: p.pictureGallery?.id
          };
          this.pictures =
            p.pictureGallery?.pictures.map((pic) => ({
              url: pic.url,
              fileName: pic.fileName,
              mimeType: pic.mimeType,
              size: pic.size,
              order: pic.order,
              cover: pic.cover
            })) || [];
        });
    }
  }

  submit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.errorMessages = {};
    const createPictures$ = this.pictures.length
      ? forkJoin(
          this.pictures.map((p, i) =>
            this.pictureService.createPicture({ ...p, order: i })
          )
        )
      : of([]);

    createPictures$
      .pipe(
        switchMap((pics: any[]) => {
          if (pics.length) {
            const pictureIds = pics.map((pic) => pic.id);
            return this.pictureGalleryService
              .createGallery({
                description: this.producto.nombre,
                pictureIds
              })
              .pipe(map((g) => g.id));
          }
          return of(undefined);
        }),
        switchMap((galleryId) => {
          const req: ProductoRequest = {
            ...this.producto,
            pictureGalleryId: galleryId
          };
          return this.isEdit && idParam
            ? this.service.updateProducto(Number(idParam), req)
            : this.service.createProducto(req);
        })
      )
      .subscribe({
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

  addPicture(): void {
    this.pictures.push({
      url: '',
      fileName: '',
      mimeType: '',
      size: 0,
      cover: false
    });
  }

  onFileSelected(event: Event, i: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.pictures[i] = {
        ...this.pictures[i],
        url: reader.result as string,
        fileName: file.name,
        mimeType: file.type,
        size: file.size
      };
    };
    reader.readAsDataURL(file);
  }

  removePicture(i: number): void {
    this.pictures.splice(i, 1);
  }
}
