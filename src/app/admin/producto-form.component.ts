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
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Picture } from '../models/picture.model';
import { CatalogoAtributo, DataType } from '../models/catalogo-atributo.model';
import { CatalogoAtributoService } from '../services/catalogo-atributo.service';
import { ProductoAtributoService } from '../services/producto-atributo.service';

interface PictureForm {
  id?: number;
  file?: File;
  previewUrl: string;
  cover: boolean;
}

interface ProductoAtributoForm {
  id?: number;
  catalogoAtributoId?: number;
  valor: any;
}

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2>{{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
    <form (ngSubmit)="submit()" *ngIf="producto">
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <button
            class="nav-link"
            [class.active]="activeTab === 'general'"
            type="button"
            (click)="activeTab = 'general'"
          >
            General
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            [class.active]="activeTab === 'atributos'"
            type="button"
            (click)="activeTab = 'atributos'"
          >
            Atributos
          </button>
        </li>
      </ul>

      <div [hidden]="activeTab !== 'general'">
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
                multiple
                class="form-control"
                (change)="onFilesSelected($event, i)"
              />
            </div>
            <img
              *ngIf="pic.previewUrl"
              [src]="pic.previewUrl"
              class="img-thumbnail mb-2"
              style="max-width: 200px"
            />
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
      </div>

      <div [hidden]="activeTab !== 'atributos'">
        <div
          class="border rounded p-2 mb-2"
          *ngFor="let atr of atributos; let i = index"
        >
          <div class="mb-2">
            <label class="form-label">Atributo</label>
            <select
              class="form-select"
              [(ngModel)]="atr.catalogoAtributoId"
              name="catalogoAtributoId{{ i }}"
            >
              <option [ngValue]="undefined">Seleccione atributo</option>
              <option
                *ngFor="let ca of catalogoAtributos"
                [ngValue]="ca.id"
              >
                {{ ca.nombre }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label class="form-label">Valor</label>
            <ng-container [ngSwitch]="getDataType(atr.catalogoAtributoId)">
              <input
                *ngSwitchCase="'NUMERIC'"
                type="number"
                class="form-control"
                [(ngModel)]="atr.valor"
                name="valor{{ i }}"
              />
              <input
                *ngSwitchCase="'DATE'"
                type="date"
                class="form-control"
                [(ngModel)]="atr.valor"
                name="valor{{ i }}"
              />
              <div *ngSwitchCase="'BOOLEAN'" class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  [(ngModel)]="atr.valor"
                  name="valor{{ i }}"
                />
              </div>
              <input
                *ngSwitchDefault
                type="text"
                class="form-control"
                [(ngModel)]="atr.valor"
                name="valor{{ i }}"
              />
            </ng-container>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-danger"
            (click)="removeAtributo(i)"
          >
            Eliminar
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-secondary"
          (click)="addAtributo()"
        >
          Agregar Atributo
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
  pictures: PictureForm[] = [];
  catalogoAtributos: CatalogoAtributo[] = [];
  atributos: ProductoAtributoForm[] = [];
  deletedAtributoIds: number[] = [];
  activeTab: 'general' | 'atributos' = 'general';

  constructor(
    private service: ProductoService,
    private categoriaService: CategoriaService,
    private pictureService: PictureService,
    private pictureGalleryService: PictureGalleryService,
    private catalogoAtributoService: CatalogoAtributoService,
    private productoAtributoService: ProductoAtributoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((data) => (this.categorias = data));
    this.catalogoAtributoService
      .getCatalogoAtributos()
      .subscribe((data) => (this.catalogoAtributos = data));
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.service.getProducto(id).subscribe((p) => {
        this.producto = {
          nombre: p.nombre,
          categoriaIds: p.categorias.map((c) => c.id),
          pictureGalleryId: p.pictureGallery?.id
        };
        const pics = p.pictureGallery?.pictures || [];
        if (pics.length) {
          forkJoin(
            pics.map((pic) =>
              this.pictureService
                .getPictureFile(pic.id)
                .pipe(map((blob) => ({ blob, pic })))
            )
          ).subscribe((results) => {
            this.pictures = results.map(({ blob, pic }) => ({
              id: pic.id,
              file: undefined,
              previewUrl: URL.createObjectURL(blob),
              cover: pic.cover
            }));
          });
        } else {
          this.pictures = [];
        }
      });
      this.productoAtributoService.getByProducto(id).subscribe((attrs) => {
        this.atributos = attrs.map((a) => ({
          id: a.id,
          catalogoAtributoId: a.catalogoAtributo.id,
          valor:
            a.catalogoAtributo.dataType === 'BOOLEAN'
              ? !!a.valor
              : a.valor
        }));
      });
    }
  }

  submit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.errorMessages = {};

    const picturesWithIndex = this.pictures.map((p, index) => ({
      ...p,
      index
    }));
    const newPictures = picturesWithIndex.filter((p) => !p.id);
    const updatePictures = picturesWithIndex.filter((p) => p.id);

    const create$ = newPictures.length
      ? forkJoin(
          newPictures.map((p) =>
            this.pictureService.createPicture(p.file!, p.index, p.cover)
          )
        )
      : of<Picture[]>([]);

    const update$ = updatePictures.length
      ? forkJoin(
          updatePictures.map((p) =>
            this.pictureService.updatePicture(
              p.id!,
              p.file ?? undefined,
              p.index,
              p.cover
            )
          )
        )
      : of<Picture[]>([]);

    forkJoin([create$, update$])
      .pipe(
        switchMap(([createdPics]) => {
          const idMap = new Map<number, number>();
          newPictures.forEach((p, i) => idMap.set(p.index, createdPics[i].id));
          updatePictures.forEach((p) => idMap.set(p.index, p.id!));
          const pictureIds = Array.from(idMap.entries())
            .sort((a, b) => a[0] - b[0])
            .map(([_, id]) => id);
          if (pictureIds.length) {
            const galleryReq = {
              description: this.producto.nombre,
              pictureIds
            };
            return this.producto.pictureGalleryId
              ? this.pictureGalleryService
                  .updateGallery(this.producto.pictureGalleryId, galleryReq)
                  .pipe(map((g) => g.id))
              : this.pictureGalleryService
                  .createGallery(galleryReq)
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
        }),
        switchMap((producto) => this.saveAtributos(producto.id))
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
    this.pictures.push({ file: undefined, previewUrl: '', cover: false });
  }

  onFilesSelected(event: Event, i: number): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, idx) => {
      const picData: PictureForm = {
        file,
        previewUrl: URL.createObjectURL(file),
        cover: false
      };
      if (idx === 0) {
        this.pictures[i] = { ...this.pictures[i], ...picData };
      } else {
        this.pictures.splice(i + idx, 0, picData);
      }
    });

    input.value = '';
  }

  removePicture(i: number): void {
    const pic = this.pictures[i];
    if (pic.previewUrl) {
      URL.revokeObjectURL(pic.previewUrl);
    }
    this.pictures.splice(i, 1);
  }

  addAtributo(): void {
    this.atributos.push({ valor: '' });
  }

  removeAtributo(i: number): void {
    const atr = this.atributos[i];
    if (atr.id) {
      this.deletedAtributoIds.push(atr.id);
    }
    this.atributos.splice(i, 1);
  }

  getDataType(id?: number): DataType | undefined {
    return this.catalogoAtributos.find((c) => c.id === id)?.dataType;
  }

  private formatValor(atr: ProductoAtributoForm): string {
    const dt = this.getDataType(atr.catalogoAtributoId);
    if (dt === 'BOOLEAN') {
      return atr.valor ? 'true' : 'false';
    }
    return atr.valor !== undefined && atr.valor !== null
      ? String(atr.valor)
      : '';
  }

  private saveAtributos(productoId: number) {
    const toCreate = this.atributos.filter((a) => !a.id && a.catalogoAtributoId);
    const toUpdate = this.atributos.filter((a) => a.id);
    const toDelete = this.deletedAtributoIds;

    const create$ = toCreate.length
      ? forkJoin(
          toCreate.map((a) =>
            this.productoAtributoService.create({
              productoId,
              catalogoAtributoId: a.catalogoAtributoId!,
              valor: this.formatValor(a)
            })
          )
        )
      : of([]);
    const update$ = toUpdate.length
      ? forkJoin(
          toUpdate.map((a) =>
            this.productoAtributoService.update(a.id!, {
              productoId,
              catalogoAtributoId: a.catalogoAtributoId!,
              valor: this.formatValor(a)
            })
          )
        )
      : of([]);
    const delete$ = toDelete.length
      ? forkJoin(toDelete.map((id) => this.productoAtributoService.delete(id)))
      : of([]);

    return forkJoin([create$, update$, delete$]);
  }
}
